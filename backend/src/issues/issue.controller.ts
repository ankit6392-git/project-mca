import { Request, Response } from "express";
import Issue from "../models/Issue";
import Notification from "../models/Notification";
import { generateComplaintId } from "../utils/generateComplaintId";
import { calculatePriority } from "../utils/priority";

/**
 * CREATE ISSUE (Citizen)
 * - Detects duplicate unresolved issues (same title + ZIP + department)
 * - Reuses existing complaint
 * - Escalates priority based on user count
 */
export const createIssue = async (req: any, res: Response) => {
  try {
    const { title, description, department, location, zipCode } = req.body;

    if (!title || !description || !department || !location || !zipCode) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!req.user?.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const normalizedTitle = title.trim().toLowerCase();

    // 🔍 Check for existing unresolved issue (same ZIP)
    const existingIssue = await Issue.findOne({
      normalizedTitle,
      zipCode,
      department,
      status: { $ne: "resolved" },
    });

    // ✅ If issue already exists
    if (existingIssue) {
      if (!existingIssue.relatedUsers.includes(req.user.id)) {
        existingIssue.relatedUsers.push(req.user.id);
        existingIssue.priority = calculatePriority(
          existingIssue.relatedUsers.length
        );
        await existingIssue.save();
      }

      return res.status(409).json({
        message: "This complaint is already registered",
        existingComplaint: existingIssue,
      });
    }

    // 🆕 Create new complaint
    const count = await Issue.countDocuments();
    const complaintId = generateComplaintId(count + 1);

    const issue = await Issue.create({
      complaintId,
      title,
      normalizedTitle,
      description,
      department,
      location,
      zipCode,
      image: req.file ? req.file.path : null,
      createdBy: req.user.id,
      relatedUsers: [req.user.id],
      priority: "LOW",
    });

    res.status(201).json(issue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create complaint" });
  }
};

/**
 * FOLLOW ISSUE
 * - Prevents duplicate follow
 * - Escalates priority
 */
export const followIssue = async (req: any, res: Response) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    if (issue.relatedUsers.includes(req.user.id)) {
      return res.status(400).json({
        message: "Already following this ticket",
      });
    }

    issue.relatedUsers.push(req.user.id);
    issue.priority = calculatePriority(issue.relatedUsers.length);

    await issue.save();

    res.json({
      message: "You are now following this issue",
      priority: issue.priority,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to follow issue" });
  }
};

/**
 * GET MY ISSUES (Citizen)
 */
export const getMyIssues = async (req: any, res: Response) => {
  try {
    const issues = await Issue.find({
      relatedUsers: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch issues" });
  }
};

/**
 * GET DEPARTMENT ISSUES (Authority)
 */
export const getDepartmentIssues = async (req: any, res: Response) => {
  try {
    const issues = await Issue.find({
      department: req.user.department,
    }).sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch department issues" });
  }
};

/**
 * UPDATE ISSUE STATUS (Authority)
 * - Notifies all related users
 */
export const updateIssueStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // 🔔 Notify all followers
    await Promise.all(
      issue.relatedUsers.map((userId: string) =>
        Notification.create({
          userId,
          message: `Issue ${issue.complaintId} is now ${issue.status}`,
        })
      )
    );

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: "Failed to update issue status" });
  }
};

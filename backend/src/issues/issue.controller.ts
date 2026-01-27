import { Request, Response } from "express";
import Issue from "../models/Issue";
import Notification from "../models/Notification";

/**
 * CREATE ISSUE (Citizen)
 */
export const createIssue = async (req: any, res: Response) => {
  try {
    const { title, description, department, location } = req.body;

    // ✅ image must be read INSIDE the controller
    const image = req.file ? req.file.path : null;

    const issue = await Issue.create({
      title,
      description,
      department,
      location,
      image,
      createdBy: req.user.id,
      status: "pending",
    });

    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create issue",
    });
  }
};

/**
 * GET MY ISSUES (Citizen)
 */
export const getMyIssues = async (req: any, res: Response) => {
  try {
    const issues = await Issue.find({ createdBy: req.user.id });
    res.json(issues);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch issues",
    });
  }
};

/**
 * GET DEPARTMENT ISSUES (Authority)
 */
export const getDepartmentIssues = async (req: any, res: Response) => {
  try {
    const issues = await Issue.find({
      department: req.user.department,
    });

    res.json(issues);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch department issues",
    });
  }
};

/**
 * UPDATE ISSUE STATUS (Authority)
 */
export const updateIssueStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    // 1️⃣ Update issue
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    // 2️⃣ Notify citizen
    await Notification.create({
      userId: issue.createdBy,
      message: `Your issue "${issue.title}" is now ${issue.status}`,
    });

    res.json(issue);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update issue status",
    });
  }
};

import { Request, Response } from "express";
import User from "../models/User";
import Issue from "../models/Issue";

/**
 * Dashboard analytics for Admin
 */
export const getAnalytics = async (_req: Request, res: Response) => {
  const totalUsers = await User.countDocuments();
  const totalIssues = await Issue.countDocuments();

  const issuesByStatus = await Issue.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const issuesByDepartment = await Issue.aggregate([
    { $group: { _id: "$department", count: { $sum: 1 } } },
  ]);

  res.json({
    totalUsers,
    totalIssues,
    issuesByStatus,
    issuesByDepartment,
  });
};

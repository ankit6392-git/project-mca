import { Request, Response } from "express";
import AuditLog from "../models/auditLog.model";

/**
 * GET AUDIT LOGS
 * /api/admin/audit-logs
 */
export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const logs = await AuditLog.find().sort({ createdAt: -1 });

    res.status(200).json({
      logs,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch audit logs" });
  }
};

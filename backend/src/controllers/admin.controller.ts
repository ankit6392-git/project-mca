import AuditLog from "../models/AuditLog";
import { Request, Response } from "express";

export const getAuditLogs = async (_req: Request, res: Response) => {
  const logs = await AuditLog.find()
    .sort({ createdAt: -1 })
    .limit(50);

  res.json(logs);
};

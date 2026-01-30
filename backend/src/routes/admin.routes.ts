import { Router } from "express";
import { getAuditLogs } from "../controllers/admin.controller";
import { verifyToken, allowRoles } from "../middlewares/auth";

const router = Router();

router.get(
  "/audit-logs",
  verifyToken,
  allowRoles("admin"),
  getAuditLogs
);

export default router;

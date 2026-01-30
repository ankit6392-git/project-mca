import { Router } from "express";
import {
  updateUserRole,
  deleteUser,
} from "../controllers/user.controller";
import { getAuditLogs } from "../controllers/admin.controller";
import { verifyToken, allowRoles } from "../middlewares/auth";
import { updateUserDepartment } from "../controllers/user.controller";


const router = Router();

router.get("/audit-logs", verifyToken, allowRoles("admin"), getAuditLogs);
router.put("/users/:id/role", verifyToken, allowRoles("admin"), updateUserRole);
router.put("/users/:id/department", verifyToken, allowRoles("admin"), updateUserDepartment);
router.delete("/users/:id", verifyToken, allowRoles("admin"), deleteUser);

export default router;

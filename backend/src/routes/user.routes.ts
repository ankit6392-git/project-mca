import { Router } from "express";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../users/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

// 🔐 Admin only
router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllUsers);
router.put("/:id/role", authMiddleware, roleMiddleware(["admin"]), updateUserRole);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteUser);

export default router;

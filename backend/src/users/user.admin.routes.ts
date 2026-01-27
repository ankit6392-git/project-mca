import { Router } from "express";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "./admin.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

/**
 * Admin routes
 */
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);

router.put(
  "/update-role/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateUserRole
);

router.delete(
  "/delete-user/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);

export default router;

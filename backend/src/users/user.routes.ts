import { Router } from "express";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "./admin.controller";
import {
  getProfile,
  updateProfile,
} from "./profile.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";


const router = Router();

/**
 * ADMIN ONLY ROUTES
 * - View all users
 * - Update user role
 * - Delete user
 */

// Get all users
//router.get("/", protect, adminOnly, getAllUsers);
router.get(
  "/all",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);

// Update user role
router.put(
  "/:id/role",
  authMiddleware,
  roleMiddleware("admin"),
  updateUserRole
);

// Delete user
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);

router.get(
  "/",
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
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);

// Profile
router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);


export default router;

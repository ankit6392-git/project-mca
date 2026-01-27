import { Router } from "express";
import { getAnalytics } from "../utils/analytics.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

/**
 * Admin Analytics Route
 * GET /api/analytics
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAnalytics
);

export default router;

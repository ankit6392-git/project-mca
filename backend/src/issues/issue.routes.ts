import { Router } from "express";
import {
  createIssue,
  getMyIssues,
  getDepartmentIssues,
  updateIssueStatus,
} from "./issue.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { upload } from "../uploads/upload";

const router = Router();

// router.post(
//   "/create",
//   authMiddleware,
//   roleMiddleware("citizen"),
//   createIssue
// );
router.post("/", upload.single("image"), createIssue);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("citizen"),
  getMyIssues
);

router.get(
  "/department",
  authMiddleware,
  roleMiddleware("authority"),
  getDepartmentIssues
);

router.put(
  "/status/:id",
  authMiddleware,
  roleMiddleware("authority"),
  updateIssueStatus
);

export default router;

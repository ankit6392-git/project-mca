// import { followIssue } from "./issue.controller";
// import { Router } from "express";
// import {
//   createIssue,
//   getMyIssues,
//   getDepartmentIssues,
//   updateIssueStatus,
// } from "./issue.controller";
// import { verifyToken, allowRoles } from "../middlewares/auth";
// import { upload } from "../uploads/upload";

// const router = Router();

// /**
//  * Citizen
//  */
// router.post(
//   "/",
//   verifyToken,
//   allowRoles("citizen"),
//   upload.single("image"),
//   createIssue
// );

// router.get(
//   "/my",
//   verifyToken,
//   allowRoles("citizen"),
//   getMyIssues
// );

// /**
//  * Authority
//  */
// router.get(
//   "/department",
//   verifyToken,
//   allowRoles("authority"),
//   getDepartmentIssues
// );

// router.put(
//   "/:id/status",
//   verifyToken,
//   allowRoles("authority"),
//   updateIssueStatus
// );

// router.post(
//   "/:id/follow",
//   verifyToken,
//   allowRoles("citizen"),
//   followIssue
// );



// export default router;

import { Router } from "express";
import {
  createIssue,
  getMyIssues,
  getDepartmentIssues,
  updateIssueStatus,
  followIssue,
} from "./issue.controller";
import { verifyToken, allowRoles } from "../middlewares/auth";
import { upload } from "../uploads/upload";

const router = Router();

/**
 * =========================
 * Citizen Routes
 * =========================
 */
router.post(
  "/",
  verifyToken,
  allowRoles("citizen"),
  upload.single("image"),
  createIssue
);

router.get(
  "/my",
  verifyToken,
  allowRoles("citizen"),
  getMyIssues
);

router.post(
  "/:id/follow",
  verifyToken,
  allowRoles("citizen"),
  followIssue
);

/**
 * =========================
 * Authority Routes
 * =========================
 */
router.get(
  "/department",
  verifyToken,
  allowRoles("authority"),
  getDepartmentIssues
);

router.put(
  "/:id/status",
  verifyToken,
  allowRoles("authority"),
  updateIssueStatus
);

export default router;

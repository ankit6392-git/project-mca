import multer from "multer";

/**
 * Multer upload configuration
 * ---------------------------
 * - 5MB file size limit
 * - Image files only
 */
export const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed"));
    } else {
      cb(null, true);
    }
  },
});

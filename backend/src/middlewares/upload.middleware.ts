// // import multer from "multer";

// // const storage = multer.diskStorage({
// //   destination: "uploads/",
// //   filename: (_req, file, cb) => {
// //     cb(null, Date.now() + "-" + file.originalname);
// //   },
// // });

// // export const upload = multer({ storage });

// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (_, file, cb) =>
//     cb(null, Date.now() + "-" + file.originalname),
// });

// export const upload = multer({
//   storage,
//   fileFilter: (_, file, cb) => {
//     if (!file.mimetype.startsWith("image/")) {
//       cb(new Error("Only images allowed"));
//     }
//     cb(null, true);
//   },
// });

import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
});

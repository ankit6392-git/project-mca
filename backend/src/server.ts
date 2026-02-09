// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import connectDB from "./config/db";

// // ✅ IMPORT ROUTES (VERY IMPORTANT)
// import authRoutes from "./routes/auth";
// import adminRoutes from "./routes/admin.routes";
// import userRoutes from "./users/user.routes";
// import issueRoutes from "./issues/issue.routes";
// import analyticsRoutes from "./routes/analytics.routes";

// dotenv.config();

// const app = express();

// // ------------------ MIDDLEWARES ------------------
// app.use(cors());
// app.use(express.json()); // 🔥 REQUIRED for JSON body parsing

// // ------------------ DATABASE ------------------
// connectDB();

// // ------------------ ROUTES ------------------
// // 🔐 AUTH ROUTES
// app.use("/api/auth", authRoutes);

// // 👥 USERS (ADMIN ONLY)
// app.use("/api/users", userRoutes);

// // 🧾 ISSUES (CITIZEN / AUTHORITY)
// app.use("/api/issues", issueRoutes);
// app.use("/api/admin", adminRoutes);

// app.use("/api/analytics", analyticsRoutes);

// app.use((err: any, _req: any, res: any, _next: any) => {
//   if (err.message.includes("File too large")) {
//     return res.status(400).json({ message: "Image must be under 5MB" });
//   }

//   res.status(500).json({ message: err.message });
// });


// // ------------------ SERVER ------------------
// app.listen(5000, () => {
//   console.log("✅ Server running on port 5000");
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db";

import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin.routes";
import userRoutes from "./users/user.routes";
import issueRoutes from "./issues/issue.routes";
import analyticsRoutes from "./routes/analytics.routes";

dotenv.config();

const app = express();

/* ✅ CORS — VERCEL SAFE */
app.use(
  cors({
    origin: "https://civicconnect-mca.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ✅ THIS IS THE KEY LINE (DO NOT REMOVE) */
app.options("*", (_req, res) => {
  res.sendStatus(200);
});

app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/analytics", analyticsRoutes);

// Error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  res.status(500).json({ message: err.message });
});

/* ❌ DO NOT app.listen() */
export default app;

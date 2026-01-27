import express from "express";
import cors from "cors";

// ✅ IMPORT ROUTES
import authRoutes from "./routes/auth";
import userRoutes from "./users/user.routes";
import issueRoutes from "./issues/issue.routes";
import analyticsRoutes from "./routes/analytics.routes";

const app = express();

// ------------------ MIDDLEWARE ------------------
app.use(cors());
app.use(express.json()); // REQUIRED for JSON body

// ------------------ ROUTES ------------------
app.get("/", (req, res) => {
  res.send("✅ Civic Connect Backend Running");
});

// 🔐 AUTH
app.use("/api/auth", authRoutes);

// 👥 USERS (Admin)
app.use("/api/users", userRoutes);

// 🧾 ISSUES (Citizen / Authority)
app.use("/api/issues", issueRoutes);

app.use("/api/analytics", analyticsRoutes);


export default app;

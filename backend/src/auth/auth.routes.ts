import { getMe } from "./auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

// Fetch logged-in user
router.get("/me", authMiddleware, getMe);

router.post("/login", authLimiter, login);

router.post("/register", authLimiter, register);

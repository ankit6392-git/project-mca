import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * AUTH MIDDLEWARE
 * ----------------
 * 1. Reads JWT from Authorization header
 * 2. Verifies token
 * 3. Attaches decoded user data to req.user
 */
export const authMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  // Expected format: Bearer <token>
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    // Attach decoded payload to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/**
 * ROLE-BASED AUTHORIZATION MIDDLEWARE
 * ----------------------------------
 * Usage: roleMiddleware("admin")
 *        roleMiddleware("citizen", "authority")
 */
export const roleMiddleware =
  (...allowedRoles: string[]) =>
  (req: any, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions",
      });
    }

    next();
  };

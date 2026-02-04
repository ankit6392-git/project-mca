import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * Verify JWT Token
 * ----------------
 * - Checks Authorization header
 * - Verifies token
 * - Attaches decoded user to req.user
 */
export const verifyToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    // attach user payload (id, role, department, etc.)
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

/**
 * Role-based access control
 * -------------------------
 * Example:
 * allowRoles("admin")
 * allowRoles("citizen", "authority")
 */
export const allowRoles = (...roles: string[]) => {
  return (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
};

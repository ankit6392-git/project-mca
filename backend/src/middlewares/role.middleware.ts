import { Request, Response, NextFunction } from "express";

/**
 * Role-based Authorization Middleware
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

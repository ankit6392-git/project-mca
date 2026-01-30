import User from "../models/User";
import AuditLog from "../models/AuditLog";
import { Request, Response } from "express";

/**
 * GET USERS (PAGINATED)
 */
export const getUsers = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().skip(skip).limit(limit),
    User.countDocuments(),
  ]);

  res.json({
    users,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
};

/**
 * UPDATE ROLE (ADMIN)
 */
export const updateUserRole = async (req: any, res: Response) => {
  const { role, department } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role, department: role === "authority" ? department : null },
    { new: true }
  );

  await AuditLog.create({
    adminId: req.user.id,
    adminName: req.user.name,
    action: `Updated role of ${user?.email} to ${role}`,
  });

  res.json(user);
};

/**
 * DELETE USER
 */
export const deleteUser = async (req: any, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);

  await AuditLog.create({
    adminId: req.user.id,
    adminName: req.user.name,
    action: `Deleted user ${user?.email}`,
  });

  res.json({ message: "User deleted" });
};


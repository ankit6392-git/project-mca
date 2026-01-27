import { Request, Response } from "express";
import User from "../models/User";

/**
 * GET ALL USERS (Admin only)
 */
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/**
 * UPDATE USER ROLE & DEPARTMENT (Admin only)
 */
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { role, department } = req.body;

    // Prepare update object
    const updateData: any = {
      role,
    };

    // If authority, set department
    if (role === "authority") {
      updateData.department = department;
    } else {
      // Otherwise clear department
      updateData.department = null;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

/**
 * DELETE USER (Admin only)
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

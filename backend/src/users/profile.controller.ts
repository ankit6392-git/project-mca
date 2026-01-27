import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

/**
 * GET MY PROFILE
 */
export const getProfile = async (req: any, res: Response) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

/**
 * UPDATE MY PROFILE
 */
export const updateProfile = async (req: any, res: Response) => {
  const { name, password } = req.body;

  const updateData: any = {};

  if (name) {
    updateData.name = name;
  }

  if (password) {
    const hashed = await bcrypt.hash(password, 10);
    updateData.password = hashed;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    updateData,
    { new: true }
  ).select("-password");

  res.json(updatedUser);
};

import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "citizen" | "authority";
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "citizen", "authority"],
      default: "citizen",
    },
  },
  { timestamps: true }
);

/**
 * ✅ PREVENT OverwriteModelError
 * Reuse model if it already exists
 */
export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

import mongoose from "mongoose";

/**
 * User Schema
 * - role decides dashboard access
 * - department is required ONLY for authority
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "citizen", "authority"],
      default: "citizen",
    },

    department: {
      type: String, // water | road | electricity
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

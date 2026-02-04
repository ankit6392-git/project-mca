import mongoose, { Schema, Document } from "mongoose";

export interface IIssue extends Document {
  title: string;
  normalizedTitle: string;
  description: string;
  department: string;
  location: string;
  zipCode: string;

  status: "pending" | "in-progress" | "resolved";

  complaintId: string;
  createdBy: string;

  relatedUsers: string[]; // users following / linked to issue
  priority: "LOW" | "MEDIUM" | "HIGH";

  image?: string;

  createdAt: Date;
  updatedAt: Date;
}

const IssueSchema = new Schema<IIssue>(
  {
    title: {
      type: String,
      required: true,
    },

    normalizedTitle: {
      type: String,
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    zipCode: {
      type: String,
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending",
    },

    complaintId: {
      type: String,
      unique: true,
      required: true,
    },

    createdBy: {
      type: String,
      required: true,
    },

    relatedUsers: {
      type: [String], // user IDs
      default: [],
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "LOW",
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IIssue>("Issue", IssueSchema);

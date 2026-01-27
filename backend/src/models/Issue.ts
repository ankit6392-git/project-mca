import mongoose, { Schema, Document } from "mongoose";

export interface IIssue extends Document {
  title: string;
  description: string;
  department: string;
  status: string;
  location?: string;
  image?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const IssueSchema = new Schema<IIssue>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },

    // ✅ NEW FIELDS
    location: {
      type: String,
    },
    image: {
      type: String,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IIssue>("Issue", IssueSchema);

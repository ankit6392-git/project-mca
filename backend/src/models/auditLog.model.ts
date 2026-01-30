import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLog extends Document {
  action: string;
  adminName: string;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    action: { type: String, required: true },
    adminName: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ SAFE MODEL EXPORT
const AuditLog =
  mongoose.models.AuditLog ||
  mongoose.model<IAuditLog>("AuditLog", auditLogSchema);

export default AuditLog;

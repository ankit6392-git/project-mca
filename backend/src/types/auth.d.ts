export interface AuthUser {
  id: string;
  role: "admin" | "citizen" | "authority";
  name: string;   // ✅ ADD THIS
  email?: string;
}

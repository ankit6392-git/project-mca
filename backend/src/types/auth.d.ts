export interface AuthUser {
  id: string;
  role: "admin" | "citizen" | "authority";
}

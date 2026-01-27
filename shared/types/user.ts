import { Role } from "../constants/roles";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

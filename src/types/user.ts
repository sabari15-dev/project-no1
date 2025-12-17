export interface User {
  userId: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

import { Request, Response } from "express";
import { createUser, findUserByEmail } from "../services/authService";


export const signupController = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;

  const existing = await findUserByEmail(email);
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  await createUser({
    userId: Date.now().toString(),
    email,
    password,
    role: "user",
  });

  res.status(201).json({ message: "Signup success" });
};

export const signinController = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Signin success", userId: user.userId });
};

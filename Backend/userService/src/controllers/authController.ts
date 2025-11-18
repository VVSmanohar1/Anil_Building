import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/User";
import { generateToken } from "../utils/token";

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  const existing = await findUserByEmail(email);
  if (existing) {
    res.status(400).json({ error: "Email already in use" });
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await createUser(name, email, hash);

  res.json({
    message: "Signup successful",
    userId: user.id,
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    res.status(400).json({ error: "Invalid credentials" });
    return;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(400).json({ error: "Invalid credentials" });
    return;
  }

  const token = generateToken(user.id);

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};

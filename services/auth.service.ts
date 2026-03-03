import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt, { SignOptions } from "jsonwebtoken";
import { IUser } from "../interfaces";
import { User } from "../models";
dotenv.config();

export class AuthService {
  static async register(data: Omit<IUser, "id" | "role" | "createdAt">) {
    const existing = await User.findOne({ where: { email: data.email } });
    if (existing) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({
      ...data,
      password: hashedPassword,
      role: "customer",
    });
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Invalid email or password");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid email or password");

    const options: SignOptions = {
      expiresIn: "1d",
    };

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      options,
    );
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }
}

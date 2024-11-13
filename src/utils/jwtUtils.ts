import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


export const createToken = (payload: object, expiresIn: string = "1h"): string => {
    if (!JWT_SECRET) {
        throw new Error("JWT secret is not defined in the environment variables.");
    }
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};


export const verifyToken = (token: string): any => {
    if (!JWT_SECRET) {
        throw new Error("JWT secret is not defined in the environment variables.");
    }
  return jwt.verify(token, JWT_SECRET);
};

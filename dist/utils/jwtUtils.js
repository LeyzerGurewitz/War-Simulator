"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const createToken = (payload, expiresIn = "1h") => {
    if (!JWT_SECRET) {
        throw new Error("JWT secret is not defined in the environment variables.");
    }
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn });
};
exports.createToken = createToken;
const verifyToken = (token) => {
    if (!JWT_SECRET) {
        throw new Error("JWT secret is not defined in the environment variables.");
    }
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
};
exports.verifyToken = verifyToken;

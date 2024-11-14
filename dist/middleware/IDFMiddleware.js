"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenForDefense = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const verifyTokenForDefense = (req, res, next) => {
    if (!JWT_SECRET) {
        throw new Error("JWT secret is not defined in the environment variables.");
    }
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Access token missing" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        if (decoded.organization === "IDF - North" ||
            decoded.organization === "IDF - South" ||
            decoded.organization === "IDF - Center" ||
            decoded.organization === "IDF - West Bank") {
            next();
        }
        else {
            throw new Error("Invalid token: No attack permission");
        }
    }
    catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};
exports.verifyTokenForDefense = verifyTokenForDefense;

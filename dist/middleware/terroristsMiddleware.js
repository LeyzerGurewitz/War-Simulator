"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAttack = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const arrIDF = ["IDF - North", "IDF - South", "IDF - Center", "IDF - West Bank"];
const verifyTokenAttack = (req, res, next) => {
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
        if (arrIDF.includes(decoded.organization)) {
            throw new Error("Invalid token: No defense ");
        }
        next();
    }
    catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};
exports.verifyTokenAttack = verifyTokenAttack;

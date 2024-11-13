"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const jwtUtils_1 = require("../utils/jwtUtils");
const userService_1 = require("../service/userService");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password, organization } = req.body;
        console.log(userName, password, organization);
        if (!userName || !password || !organization) {
            throw new Error("Missing name or  organization  or password");
        }
        const user = yield (0, userService_1.createUserService)(userName, password, organization);
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            throw new Error("Missing name or password");
        }
        const user = yield (0, userService_1.findUserService)(userName, password);
        if (user) {
            const token = (0, jwtUtils_1.createToken)({ _id: user._id, status: user.organization }, '1d');
            res.status(201).json({ message: "Login successful", user: { id: user._id, role: user.organization, token: token } });
        }
        else {
            res.status(401).json({ message: "Authentication failed" });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;

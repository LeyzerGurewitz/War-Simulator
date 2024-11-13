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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserInDB = exports.createUser = exports.findUserName = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const findUserName = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const isFindUser = yield userModel_1.default.findOne({ userName });
    if (isFindUser) {
        throw new Error('User already exists');
    }
    return true;
});
exports.findUserName = findUserName;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield userModel_1.default.create(user);
    if (!newUser) {
        throw new Error("Failed to create new teacher");
    }
    return newUser;
});
exports.createUser = createUser;
const findUserInDB = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield userModel_1.default.findOne({ userName: userName });
    if (!newUser) {
        throw new Error("No user found");
    }
    return newUser;
});
exports.findUserInDB = findUserInDB;

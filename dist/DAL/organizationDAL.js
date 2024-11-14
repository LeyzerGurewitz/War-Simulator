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
exports.getMissileCount = exports.updateMissileCount = exports.findOrganizationById = void 0;
const organizations_1 = __importDefault(require("../models/organizations"));
const userModel_1 = __importDefault(require("../models/userModel"));
const findOrganizationById = (organization) => __awaiter(void 0, void 0, void 0, function* () {
    const isFindOrganizations = yield organizations_1.default.findOne({ name: organization });
    if (!isFindOrganizations) {
        throw new Error('User already exists');
    }
    return isFindOrganizations;
});
exports.findOrganizationById = findOrganizationById;
const updateMissileCount = (userId, missileName, change) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const organization = yield organizations_1.default.findById(user.organization);
    if (!organization) {
        throw new Error("Organization not found");
    }
    const missile = organization.resources.find((resource) => resource.name === missileName);
    if (!missile) {
        throw new Error(`Missile ${missileName} not found`);
    }
    if (missile.amount + change < 0) {
        throw new Error(`Not enough missile ${missileName}`);
    }
    missile.amount += change;
    yield organization.save();
});
exports.updateMissileCount = updateMissileCount;
const getMissileCount = (userId, missileName) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const organization = yield organizations_1.default.findById(user.organization);
    if (!organization) {
        throw new Error("Organization not found");
    }
    const missile = organization.resources.find((resource) => resource.name === missileName);
    return missile ? missile.amount : 0;
});
exports.getMissileCount = getMissileCount;

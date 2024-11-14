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
exports.launchMissile = void 0;
const organizationDAL_1 = require("../DAL/organizationDAL");
const missiles_1 = __importDefault(require("../models/missiles"));
const launchMissile = (io, userId, region, missileName) => __awaiter(void 0, void 0, void 0, function* () {
    const missileCount = yield (0, organizationDAL_1.getMissileCount)(userId, missileName);
    if (missileCount <= 0) {
        throw new Error(`No ${missileName} missiles available `);
    }
    yield (0, organizationDAL_1.updateMissileCount)(userId, missileName, -1);
    io.to(region).emit("missile-launched", { region, missileName });
    const missile = yield missiles_1.default.findOne({ name: missileName });
    const hitTime = missile === null || missile === void 0 ? void 0 : missile.speed;
    if (!hitTime) {
        return;
    }
    let count = hitTime;
    const intervalId = setInterval(() => {
        if (count <= 0) {
            clearInterval(intervalId);
            io.to(region).emit("missile-hit", { region, missileName });
        }
        else {
            io.to(region).emit("missile-inAir", { region, missileName, count });
            count--;
        }
    }, 1000);
});
exports.launchMissile = launchMissile;

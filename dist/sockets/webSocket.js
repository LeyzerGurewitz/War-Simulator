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
exports.initializeSocketServer = void 0;
const attackService_1 = require("../service/attackService");
const initializeSocketServer = (io) => {
    io.on("connection", (socket) => {
        console.log(`A client connected: ${socket.id}`);
        socket.on("join_room", (region) => {
            socket.join(region);
            console.log(`Client ${socket.id} joined region ${region}`);
        });
        socket.on("launch_missile", (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, region, missileName }) {
            try {
                yield (0, attackService_1.launchMissile)(io, userId, region, missileName);
            }
            catch (error) {
                socket.emit("error", { message: error.message });
            }
        }));
        socket.on("intercept_missile", ({ region, missileName, success }) => {
            io.to(region).emit("interception_result", {
                missileName,
                region,
                result: success ? "success" : "Defense",
            });
        });
        socket.on("leave_room", (region) => {
            socket.leave(region);
            console.log(`Client ${socket.id} left region ${region}`);
        });
        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};
exports.initializeSocketServer = initializeSocketServer;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStructure = void 0;
class ResponseStructure {
    constructor(success, data, message) {
        this.success = success;
        this.data = data;
        this.message = message;
    }
}
exports.ResponseStructure = ResponseStructure;

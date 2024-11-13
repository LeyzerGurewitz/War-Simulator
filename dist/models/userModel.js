"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: [true, "Please provide a user name"],
        minlength: [3, "User name must be at least 3 characters"],
        maxlength: [30, "User name can have at most 30 characters"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    organization: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Organization',
        required: [true, "Please specify an organization"]
    },
    organizationName: {
        type: String,
        required: [true, "Please provide a organizationName"]
    }
});
exports.default = (0, mongoose_1.model)('User', UserSchema);

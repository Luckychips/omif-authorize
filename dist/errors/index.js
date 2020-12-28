"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinError = exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = statusCode;
    }
}
exports.ValidationError = ValidationError;
class JoinError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = 'JoinError';
        this.statusCode = statusCode;
    }
}
exports.JoinError = JoinError;

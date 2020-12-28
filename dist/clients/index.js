"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosClient = exports.ApolloClient = void 0;
var Apollo_1 = require("./Apollo");
Object.defineProperty(exports, "ApolloClient", { enumerable: true, get: function () { return __importDefault(Apollo_1).default; } });
var Axios_1 = require("./Axios");
Object.defineProperty(exports, "AxiosClient", { enumerable: true, get: function () { return __importDefault(Axios_1).default; } });

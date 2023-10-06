"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    },
    verbose: true,
    testPathIgnorePatterns: [
        "/node_modules/"
    ],
    preset: 'ts-jest',
    testEnvironment: 'node',
};
exports.default = config;

import type { Config } from 'jest';

const config: Config = {
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

export default config;
const dotenv = require("dotenv");
const fs = require("fs");

const ENV = process.env.TEST_ENV;

if (!ENV) {
    throw new Error(
        "TEST_ENV is not set. Please specify the environment matching an existing .env file (e.g., .env.horizentestnet)."
    );
}

const envFile = `.env.${ENV}`;
if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile });
    console.log(`Loaded environment file: ${envFile}`);
} else {
    throw new Error(`Environment file ${envFile} not found.`);
}

const localEnvFile = `.env`;
if (fs.existsSync(localEnvFile)) {
    dotenv.config({ path: localEnvFile });
    console.log(`Loaded sensitive data from: ${localEnvFile}`);
} else {
    console.log(`No local sensitive data file (${localEnvFile}) found.`);
}

const ENABLE_TRANSACTION_TESTS = process.env.ENABLE_TRANSACTION_TESTS === "true";
const ENABLE_DEBUG_TESTS = process.env.ENABLE_DEBUG_TESTS === "true";
const CUSTOM_RPC_TESTS = process.env.CUSTOM_RPC_TESTS
    ? process.env.CUSTOM_RPC_TESTS.split(",")
    : [];
const UNSUPPORTED_METHODS = process.env.UNSUPPORTED_METHODS
    ? process.env.UNSUPPORTED_METHODS.split(",")
    : [];

if (ENABLE_TRANSACTION_TESTS) {
    if (!process.env.SEND_FROM_PK || !process.env.SEND_FROM_PK2) {
        throw new Error(
            "ENABLE_TRANSACTION_TESTS is set to true, but SEND_FROM_PK and SEND_FROM_PK2 are not defined."
        );
    }
}

if (ENABLE_DEBUG_TESTS) {
    if (!process.env.RPC_USERNAME || !process.env.RPC_PASSWORD) {
        throw new Error(
            "ENABLE_DEBUG_TESTS is set to true, but RPC_USERNAME and RPC_PASSWORD are not defined."
        );
    }
}

let testMatch = ["<rootDir>/rpc/**/*.test.[tj]s"];
let testPathIgnorePatterns = ["<rootDir>/rpc/custom/"];

if (!ENABLE_TRANSACTION_TESTS) {
    testPathIgnorePatterns.push("<rootDir>/rpc/transactions/");
}
if (!ENABLE_DEBUG_TESTS) {
    testPathIgnorePatterns.push("<rootDir>/rpc/debug/");
}

if (CUSTOM_RPC_TESTS.length > 0) {
    const customTestPatterns = CUSTOM_RPC_TESTS.map(
        (dir) => `<rootDir>/rpc/custom/${dir}/**/*.test.[tj]s`
    );
    testMatch = [...testMatch, ...customTestPatterns];
    testPathIgnorePatterns = testPathIgnorePatterns.filter(
        (pattern) => !pattern.includes("rpc/custom")
    );
}

if (UNSUPPORTED_METHODS.length > 0) {
    console.log("Ignoring tests for unsupported methods:", UNSUPPORTED_METHODS.join(", "));

    const unsupportedTestPatterns = UNSUPPORTED_METHODS.map((method) => {
        const [namespace, ...methodParts] = method.split("_");
        const methodName = methodParts.join("");
        return `<rootDir>/rpc/${namespace}/${methodName}`;
    });

    testPathIgnorePatterns.push(...unsupportedTestPatterns);
}

console.log("testPathIgnorePatterns:", testPathIgnorePatterns);

const config = {
    testTimeout: 120000,
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest",
    },
    reporters: [
        "default",
        [
            "jest-html-reporter",
            {
                pageTitle: `RPC Test Report - ${ENV}`,
                outputPath: getReportPath(ENV),
                includeFailureMsg: true,
            },
        ],
    ],
    testMatch,
    testPathIgnorePatterns,
};

function getReportPath(testEnv) {
    const timestamp = new Date().toISOString().replace(/:/g, "-").slice(0, -5);
    return `./reports/test-report-${testEnv}-${timestamp}.html`;
}

module.exports = config;

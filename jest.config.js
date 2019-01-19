module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "moduleNameMapper": {
        "@robot-analytics/processing/(.*)": "<rootDir>/src/app/processing/$1",
        "@robot-analytics/data/(.*)": "<rootDir>/src/app/data/$1",
        "@robot-analytics/state/(.*)": "<rootDir>/src/app/state/$1",
        "@robot-analytics/routes/(.*)": "<rootDir>/src/app/routes/$1",
        "@robot-analytics/components/(.*)": "<rootDir>/src/app/components/$1",
    }
};

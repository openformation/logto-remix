module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverage: Boolean(process.env.CI),
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        sourceMaps: true,
      },
    ],
  },
};

const config = {
  reporters: [
    "default",
    [
      "jest-html-reporter", {
      pageTitle: "RPC Test Report",
      outputPath: getReportPath('gobi'),
      includeFailureMsg: true,
    }
    ],
  ],
};

function getReportPath(testEnv) {
  const timestamp = new Date().toISOString().replace(/:/g, "-").slice(0, -5);
  return `./test-report-${testEnv}-${timestamp}.html`;
}

module.exports = config;

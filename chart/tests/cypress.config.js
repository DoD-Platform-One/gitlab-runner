const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 120000,
  e2e: {
    env: {
      baseUrl: "https://gitlab.bigbang.dev"
    },
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 0,
//    testIsolation: false,
    video: true,
    videoCompression: 35,
    screenshot: true,
    screenshotOnRunFailure: true,
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
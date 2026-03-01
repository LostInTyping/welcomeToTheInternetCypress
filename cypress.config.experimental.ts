import { defineConfig } from 'cypress'

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: 'https://the-internet.herokuapp.com',
    defaultCommandTimeout: 8000,
    screenshotOnRunFailure: true,
    experimentalOriginDependencies: true,
    setupNodeEvents(on, _config) {
      on('before:run', () => {
        console.log('[cypress:experimental] before:run')
      })

      on('after:run', () => {
        console.log('[cypress:experimental] after:run')
      })

      on('before:spec', (spec) => {
        console.log(`[cypress:experimental] before:spec ${spec.relative}`)
      })

      on('after:spec', (spec, results) => {
        const passed = results?.stats?.passes ?? 0
        const failed = results?.stats?.failures ?? 0
        console.log(
          `[cypress:experimental] after:spec ${spec.relative} passed=${passed} failed=${failed}`,
        )
      })
    },
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
  },

  experimentalCspAllowList: true,
  experimentalFastVisibility: true,
  experimentalInteractiveRunEvents: true,
  experimentalMemoryManagement: true,
  experimentalModifyObstructiveThirdPartyCode: true,
  experimentalRunAllSpecs: true,
  experimentalSourceRewriting: true,
  experimentalWebKitSupport: true,

  retries: {
    experimentalStrategy: 'detect-flake-and-pass-on-threshold',
    experimentalOptions: {
      maxRetries: 2,
      passesRequired: 1,
    },
    openMode: true,
    runMode: true,
  },
})

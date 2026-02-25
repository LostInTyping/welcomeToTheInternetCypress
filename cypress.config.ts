import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://the-internet.herokuapp.com',
    defaultCommandTimeout: 8000,
    screenshotOnRunFailure: true,
    setupNodeEvents(_on, _config) {},
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
  },
})

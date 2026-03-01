# welcome-to-the-internet-qa

Portfolio Cypress E2E demo for https://the-internet.herokuapp.com/.

This repository shows how I design and maintain a full browser test suite with TypeScript, reusable test helpers, and CI reporting.

## What this project demonstrates

- End-to-end test coverage for 44 independent pages.
- Happy path plus negative and edge-case scenarios.
- Cypress patterns for tricky UI behavior (auth, iframes, drag-and-drop, alerts, new windows, geolocation).
- Reusable custom commands and fixtures.
- HTML reporting with Mochawesome.
- GitHub Actions CI with uploaded run artifacts.

## Tech stack

- Cypress 15
- TypeScript (strict mode)
- Mochawesome + mochawesome-merge + mochawesome-report-generator

## Quick start

```bash
npm ci
npx cypress install
npm run typecheck
npm run cy:run
npm run report
```

Open Cypress interactively:

```bash
npm run cy:open
```

Run a single spec:

```bash
npx cypress run --spec cypress/e2e/form-authentication.cy.ts
```

## Experimental profile

This repo includes `cypress.config.experimental.ts` plus helper scripts to run all specs with an experimental configuration profile.

```bash
npm run cy:open:exp
npm run cy:run:exp
```

Browser-specific runs:

```bash
npm run cy:run:exp:chrome
npm run cy:run:exp:edge
npm run cy:run:exp:webkit
```

Experimental profile currently enables:

- `experimentalCspAllowList`
- `experimentalFastVisibility`
- `experimentalInteractiveRunEvents`
- `experimentalMemoryManagement`
- `experimentalModifyObstructiveThirdPartyCode`
- `experimentalOriginDependencies` (E2E scope)
- `experimentalRunAllSpecs`
- `experimentalSourceRewriting`
- `experimentalWebKitSupport`
- `retries.experimentalStrategy` + `retries.experimentalOptions`

Notes:

- `experimentalSingleTabRunMode` is component-testing only and does not apply to this E2E-only project.
- `experimentalPromptCommand` is currently managed in the Cypress App and is not configured in this repo config file.
- WebKit runs require a local `playwright-webkit` install (`npm i -D playwright-webkit`).

## Reports

- JSON result files: `cypress/results/`
- Generated HTML report: `cypress/results/report.html`

## CI

The workflow at `.github/workflows/cypress.yml` runs type-checking and the full Cypress suite on push and pull requests, then uploads Cypress and report artifacts. A manual `workflow_dispatch` run also includes a non-blocking experimental profile job.

## Project structure

```text
cypress/
  e2e/                 # 44 page-level spec files
  fixtures/            # test fixture data (credentials)
  support/             # custom commands and global setup
  results/             # mochawesome output (gitignored)
```

## Notes

- Tests run against a live public demo site, so occasional transient failures can happen due to network or upstream site instability.
- Credentials in this repo are public demo credentials from the target site, used only for test scenarios.
- `allowCypressEnv` is explicitly disabled in config to avoid exposing environment values to browser code.

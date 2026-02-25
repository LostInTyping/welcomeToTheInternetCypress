describe('Status Codes', () => {
  beforeEach(() => {
    cy.visit('/status_codes')
  })

  // TODO: Verify page heading "Status Codes"
  // TODO: Verify links for 200, 301, 404, 500 all exist
  // TODO: Each link has expected text content
  // TODO: cy.request /status_codes/200 → 200
  // TODO: cy.request /status_codes/301 (followRedirect: false) → 301
  // TODO: cy.request /status_codes/404 (failOnStatusCode: false) → 404
  // TODO: cy.request /status_codes/500 (failOnStatusCode: false) → 500
  // TODO: Each status code page shows descriptive text about that code
})

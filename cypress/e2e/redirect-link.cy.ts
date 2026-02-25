describe('Redirect Link', () => {
  beforeEach(() => {
    cy.visit('/redirector')
  })

  // TODO: Verify page heading "Redirection"
  // TODO: a#redirect exists with text "here"
  // TODO: Verify link href attribute points to expected path
  // TODO: Clicking it navigates to /status_codes
  // TODO: Verify /status_codes destination page has expected content
  // TODO: cy.request('/redirector', { followRedirect: false }) returns 301 or 302
})

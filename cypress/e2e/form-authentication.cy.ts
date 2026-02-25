describe('Form Authentication', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  // TODO: Verify login page structure: username, password, Login button
  // TODO: Valid login (tomsmith / SuperSecretPassword!) → /secure with flash
  // TODO: Verify /secure page heading ("Secure Area")
  // TODO: Use cy.login() custom command for at least one test
  // TODO: Flash close button (X) dismisses the flash message
  // TODO: Logout navigates back to /login
  // TODO: Invalid username shows error flash
  // TODO: Invalid password shows error flash
  // TODO: Empty username and password shows error flash
})

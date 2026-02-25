describe('Slow Resources', () => {
  beforeEach(() => {
    cy.visit('/slow', { timeout: 30000 })
  })

  // TODO: Verify page heading "Slow Resources"
  // TODO: Body and h3 both visible after load
  // TODO: Page content area (.example) exists
  // Note: Page can take 10-30s to load
})

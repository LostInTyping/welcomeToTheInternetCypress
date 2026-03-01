describe('Slow Resources', () => {
  beforeEach(() => {
    cy.visit('/slow', { timeout: 30000 })
  })

  it('happy path ⋙ page heading is present', () => {
    cy.contains('h3', 'Slow Resources')
  })

  it('happy path ⋙ body and h3 both visible after load', () => {
    cy.get('body').should('be.visible')
    cy.get('h3').should('be.visible')
  })

  it('happy path ⋙ page content area exists', () => {
    cy.get('.example').should('exist')
  })
})

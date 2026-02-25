describe('Add/Remove Elements', () => {
  beforeEach(() => {
    cy.visit('/add_remove_elements/')
  })

  it('initial state — no Delete buttons on page load', () => {
    cy.get('.added-manually').should('not.exist')
  })

  it('initial state — page heading is present', () => {
    cy.contains('h3', 'Add/Remove Elements')
  })

  it('happy path — clicking Add Element creates a Delete button', () => {
    cy.contains('button', 'Add Element').click()
    cy.get('.added-manually').should('have.length', 1).and('contain', 'Delete')
  })

  it('happy path — Add Element button persists after adding elements', () => {
    cy.contains('button', 'Add Element').click()
    cy.contains('button', 'Add Element').click()
    cy.contains('button', 'Add Element').should('be.visible')
  })

  it('happy path — multiple adds create multiple Delete buttons', () => {
    cy.contains('button', 'Add Element').click()
    cy.contains('button', 'Add Element').click()
    cy.contains('button', 'Add Element').click()
    cy.get('.added-manually').should('have.length', 3)
  })

  it('happy path — deleting one of many leaves the rest', () => {
    cy.contains('button', 'Add Element').click()
    cy.contains('button', 'Add Element').click()
    cy.contains('button', 'Add Element').click()
    cy.get('.added-manually').should('have.length', 3)
    cy.get('.added-manually').first().click()
    cy.get('.added-manually').should('have.length', 2)
  })

  it('happy path — clicking Delete removes the element', () => {
    cy.contains('button', 'Add Element').click()
    cy.get('.added-manually').should('have.length', 1)
    cy.get('.added-manually').click()
    cy.get('.added-manually').should('not.exist')
  })

  it('happy path — delete all returns to clean state', () => {
    cy.contains('button', 'Add Element').click()
    cy.contains('button', 'Add Element').click()
    cy.contains('button', 'Add Element').click()
    cy.get('.added-manually').should('have.length', 3)
    cy.get('.added-manually').first().click()
    cy.get('.added-manually').first().click()
    cy.get('.added-manually').first().click()
    cy.get('.added-manually').should('not.exist')
    cy.get('#elements').children().should('have.length', 0)
  })
})

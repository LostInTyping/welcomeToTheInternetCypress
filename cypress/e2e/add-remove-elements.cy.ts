describe('Add/Remove Elements', () => {
  beforeEach(() => {
    cy.visit('/add_remove_elements/')
  })

  it('happy path — clicking Add Element creates a Delete button', () => {
    cy.contains('button', 'Add Element').click()
    cy.get('.added-manually').should('have.length', 1).and('contain', 'Delete')
  })

  it('happy path — multiple adds create multiple Delete buttons', () => {
    cy.contains('button', 'Add Element').click()
    cy.contains('button', 'Add Element').click()
    cy.contains('button', 'Add Element').click()
    cy.get('.added-manually').should('have.length', 3)
  })

  it('happy path — clicking Delete removes the element', () => {
    cy.contains('button', 'Add Element').click()
    cy.get('.added-manually').should('have.length', 1)
    cy.get('.added-manually').click()
    cy.get('.added-manually').should('not.exist')
  })
})

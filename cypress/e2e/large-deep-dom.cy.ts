describe('Large & Deep DOM', () => {
  beforeEach(() => {
    cy.visit('/large', { timeout: 20000 })
  })

  it('happy path ⋙ page heading is visible', () => {
    cy.get('h3').should('have.text', 'Large & Deep DOM')
  })

  it('happy path ⋙ table is visible', () => {
    cy.get('#large-table').should('be.visible')
  })

  it('happy path ⋙ specific deep elements exist', () => {
    cy.get('[id="sibling-50.3"]').should('exist')
    cy.get('[id="sibling-1.1"]').should('exist')
  })

  it('happy path ⋙ table has rows and columns', () => {
    cy.get('#large-table tr').should('have.length.gte', 50)
    cy.get('#large-table td').should('have.length.gte', 50)
  })

  it('happy path ⋙ "No Siblings" section exists on the page', () => {
    cy.contains('h4', 'No Siblings').should('exist')
    cy.get('#no-siblings').should('exist')
  })

  it('happy path ⋙ sibling elements section exists on the page', () => {
    cy.contains('h4', 'Siblings').should('exist')
    cy.get('#siblings').should('exist')
    cy.get('[id^="sibling-"]').should('have.length.gte', 1)
  })
})

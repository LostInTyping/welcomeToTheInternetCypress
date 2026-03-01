describe('A/B Testing', () => {
  beforeEach(() => {
    cy.visit('/abtest')
  })

  it('happy path ⋙ heading displays an A/B Test variant', () => {
    cy.get('h3').invoke('text').should('match', /A\/B Test/)
  })

  it('happy path ⋙ exactly one heading is present', () => {
    cy.get('h3').should('have.length', 1)
  })

  it('happy path ⋙ descriptive paragraph is present', () => {
    cy.get('.example p').should('exist').and('not.be.empty')
  })

  it('initial state ⋙ page renders with expected structure', () => {
    cy.get('.example').should('exist')
    cy.get('.example h3').should('have.length', 1)
    cy.get('.example p').should('have.length.gte', 1)
  })
})

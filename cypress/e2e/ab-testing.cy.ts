describe('A/B Testing', () => {
  beforeEach(() => {
    cy.visit('/abtest')
  })

  it('happy path — heading matches A/B Test pattern', () => {
    cy.contains('h3', /A\/B Test/)
  })

  it('negative — only one heading present', () => {
    cy.get('h3').should('have.length', 1)
  })
})

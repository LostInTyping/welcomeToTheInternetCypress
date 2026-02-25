describe('A/B Testing', () => {
  beforeEach(() => {
    cy.visit('/abtest')
  })

  it('happy path — heading matches A/B Test pattern', () => {
    cy.contains('h3', /A\/B Test/)
  })

  it('happy path — exactly one heading is present', () => {
    cy.get('h3').should('have.length', 1)
  })
})

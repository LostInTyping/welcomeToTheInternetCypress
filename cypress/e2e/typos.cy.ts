describe('Typos', () => {
  beforeEach(() => {
    cy.visit('/typos')
  })

  it('happy path — page heading is present', () => {
    cy.contains('h3', 'Typos')
  })

  it('happy path — page has at least 2 paragraphs', () => {
    cy.get('.example p').should('have.length.gte', 2)
  })

  it('happy path — first paragraph contains "This example demonstrates"', () => {
    cy.get('.example p').eq(0).should('contain', 'This example demonstrates')
  })

  it('edge case — second paragraph text accounts for random typo', () => {
    cy.get('.example p').eq(1).invoke('text').should('match', /[Ss]om[a-z]+imes/)
  })

  it('happy path — .example container structure exists', () => {
    cy.get('.example').should('exist').and('be.visible')
  })
})

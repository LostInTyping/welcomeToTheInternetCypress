describe('Disappearing Elements', () => {
  beforeEach(() => {
    cy.visit('/disappearing_elements')
  })

  it('happy path ⋙ page heading is visible', () => {
    cy.get('h3').should('have.text', 'Disappearing Elements')
  })

  it('happy path ⋙ at least 4 nav items are present', () => {
    cy.get('.example li').should('have.length.gte', 4)
  })

  it('happy path ⋙ consistently present nav items exist', () => {
    cy.get('.example li').should('contain', 'Home')
    cy.get('.example li').should('contain', 'About')
    cy.get('.example li').should('contain', 'Contact Us')
    cy.get('.example li').should('contain', 'Portfolio')
  })

  it('happy path ⋙ Gallery item is non-deterministic (4 or 5 items)', () => {
    cy.get('.example li').its('length').should('be.within', 4, 5)
  })

  it('happy path ⋙ each nav link has a non-empty href', () => {
    cy.get('.example li a').each(($a) => {
      cy.wrap($a).should('have.attr', 'href').and('not.be.empty')
    })
  })

  it('happy path ⋙ clicking Home navigates to root', () => {
    cy.get('.example li a').contains('Home').click()
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
  })
})

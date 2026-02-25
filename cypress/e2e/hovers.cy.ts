describe('Hovers', () => {
  beforeEach(() => {
    cy.visit('/hovers')
  })

  it('happy path — page heading is visible', () => {
    cy.get('h3').should('have.text', 'Hovers')
  })

  it('happy path — 3 .figure elements exist on the page', () => {
    cy.get('.figure').should('have.length', 3)
  })

  it('initial state — .figcaption is hidden before hover', () => {
    cy.get('.figcaption').each(($caption) => {
      cy.wrap($caption).should('not.be.visible')
    })
  })

  it('happy path — hovering .figure reveals .figcaption', () => {
    cy.get('.figure').first().trigger('mouseover')
    cy.get('.figure').first().find('.figcaption').should('be.visible')
  })

  it('happy path — all 3 users show name user{n} on hover', () => {
    cy.get('.figure').each(($figure, index) => {
      cy.wrap($figure).trigger('mouseover')
      cy.wrap($figure).find('.figcaption h5').should('contain.text', `user${index + 1}`)
    })
  })

  it('happy path — "View profile" link exists in each revealed figcaption', () => {
    cy.get('.figure').each(($figure) => {
      cy.wrap($figure).trigger('mouseover')
      cy.wrap($figure).find('.figcaption a').should('contain.text', 'View profile')
    })
  })

  it('happy path — profile link href follows pattern /users/N', () => {
    cy.get('.figure').each(($figure, index) => {
      cy.wrap($figure).trigger('mouseover')
      cy.wrap($figure).find('.figcaption a').should('have.attr', 'href', `/users/${index + 1}`)
    })
  })
})

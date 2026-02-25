describe('Infinite Scroll', () => {
  beforeEach(() => {
    cy.visit('/infinite_scroll')
  })

  it('happy path — page heading is visible', () => {
    cy.get('h3').should('have.text', 'Infinite Scroll')
  })

  it('happy path — page loads with initial paragraph content', () => {
    cy.get('.jscroll-inner .jscroll-added').should('have.length.greaterThan', 0)
  })

  it('happy path — scrolling to bottom loads more paragraphs', () => {
    cy.get('.jscroll-inner .jscroll-added').its('length').then((initialCount) => {
      cy.scrollTo('bottom')
      cy.wait(2000)
      cy.get('.jscroll-inner .jscroll-added').should('have.length.greaterThan', initialCount)
    })
  })

  it('happy path — new content is appended, not replaced', () => {
    // Mark all initial elements so we can verify they persist after scroll
    cy.get('.jscroll-inner .jscroll-added').each(($el) => {
      $el.attr('data-initial', 'true')
    })

    cy.scrollTo('bottom')
    cy.wait(2000)

    // Original marked elements should still be in the DOM
    cy.get('.jscroll-inner .jscroll-added[data-initial="true"]').should('have.length.greaterThan', 0)
    // New elements without the marker should also exist
    cy.get('.jscroll-inner .jscroll-added:not([data-initial])').should('have.length.greaterThan', 0)
  })

  it('happy path — second scroll loads even more content', () => {
    cy.scrollTo('bottom')
    cy.wait(2000)

    cy.get('.jscroll-inner .jscroll-added').its('length').then((countAfterFirst) => {
      cy.scrollTo('bottom')
      cy.wait(2000)
      cy.get('.jscroll-inner .jscroll-added').should('have.length.greaterThan', countAfterFirst)
    })
  })
})

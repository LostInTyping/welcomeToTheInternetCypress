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
    let initialCount: number

    cy.get('.jscroll-inner .jscroll-added').its('length').then((count) => {
      initialCount = count
    })

    cy.get('.jscroll-inner .jscroll-added').last().scrollIntoView()
    cy.wait(2000)

    cy.get('.jscroll-inner .jscroll-added').should('have.length.greaterThan', initialCount)
  })

  it('happy path — new content is appended, not replaced', () => {
    let initialCount: number

    cy.get('.jscroll-inner .jscroll-added').its('length').then((count) => {
      initialCount = count
    })

    cy.get('.jscroll-inner .jscroll-added').last().scrollIntoView()
    cy.wait(2000)

    cy.get('.jscroll-inner .jscroll-added').its('length').then((newCount) => {
      expect(newCount).to.be.greaterThan(initialCount)
    })
  })

  it('happy path — second scroll loads even more content', () => {
    let countAfterFirstScroll: number

    cy.get('.jscroll-inner .jscroll-added').last().scrollIntoView()
    cy.wait(2000)

    cy.get('.jscroll-inner .jscroll-added').its('length').then((count) => {
      countAfterFirstScroll = count
    })

    cy.get('.jscroll-inner .jscroll-added').last().scrollIntoView()
    cy.wait(2000)

    cy.get('.jscroll-inner .jscroll-added').should('have.length.greaterThan', countAfterFirstScroll)
  })
})

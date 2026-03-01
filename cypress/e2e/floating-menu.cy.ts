describe('Floating Menu', () => {
  beforeEach(() => {
    cy.visit('/floating_menu')
  })

  it('happy path ⋙ menu is visible at top of page', () => {
    cy.get('#menu').should('be.visible')
  })

  it('happy path ⋙ menu has absolute positioning', () => {
    cy.get('#menu').should('have.css', 'position', 'absolute')
  })

  it('happy path ⋙ contains all 4 nav links', () => {
    cy.get('#menu a[href="#home"]').should('exist')
    cy.get('#menu a[href="#news"]').should('exist')
    cy.get('#menu a[href="#contact"]').should('exist')
    cy.get('#menu a[href="#about"]').should('exist')
  })

  it('happy path ⋙ nav link text matches expected labels', () => {
    cy.get('#menu a[href="#home"]').should('have.text', 'Home')
    cy.get('#menu a[href="#news"]').should('have.text', 'News')
    cy.get('#menu a[href="#contact"]').should('have.text', 'Contact')
    cy.get('#menu a[href="#about"]').should('have.text', 'About')
  })

  it('happy path ⋙ remains visible after scrolling down 600px', () => {
    cy.scrollTo(0, 600)
    cy.get('#menu').should('be.visible')
  })

  it('happy path ⋙ remains visible after scrolling to bottom of page', () => {
    cy.scrollTo('bottom')
    cy.get('#menu').should('be.visible')
  })
})

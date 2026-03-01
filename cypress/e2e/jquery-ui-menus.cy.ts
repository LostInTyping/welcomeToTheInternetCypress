describe('jQuery UI Menus', () => {
  beforeEach(() => {
    cy.visit('/jqueryui/menu')
  })

  it('happy path ⋙ page heading is visible', () => {
    cy.get('h3').should('have.text', 'JQueryUI - Menu')
  })

  it('happy path ⋙ #menu is visible', () => {
    cy.get('#menu').should('be.visible')
  })

  it('happy path ⋙ hovering "Enabled" reveals submenu items', () => {
    cy.contains('#menu > li', 'Enabled').trigger('mouseover')
    cy.contains('#menu > li', 'Enabled').find('ul').should('be.visible')
  })

  it('happy path ⋙ submenu items have expected text', () => {
    cy.contains('#menu > li', 'Enabled').trigger('mouseover')
    cy.contains('#menu > li', 'Enabled').find('ul li')
      .should('contain', 'Downloads')
    cy.contains('#menu > li', 'Enabled').find('ul li')
      .should('contain', 'Back to JQuery UI')
  })

  it('happy path ⋙ "Disabled" has class ui-state-disabled', () => {
    cy.contains('#menu > li', 'Disabled')
      .should('have.class', 'ui-state-disabled')
  })

  it('happy path ⋙ clicking "Back to JQuery UI" navigates away', () => {
    cy.contains('#menu > li', 'Enabled').trigger('mouseover')
    cy.contains('#menu a', 'Back to JQuery UI').click({ force: true })
    cy.url().should('include', '/jqueryui')
    cy.url().should('not.include', '/menu')
  })
})

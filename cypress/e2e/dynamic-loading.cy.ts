describe('Dynamic Loading', () => {
  it('initial state — Example 1: #finish element is hidden before clicking Start', () => {
    cy.visit('/dynamic_loading/1')
    cy.get('#finish').should('not.be.visible')
  })

  it('initial state — Example 2: #finish element does not exist in DOM before clicking Start', () => {
    cy.visit('/dynamic_loading/2')
    cy.get('#finish').should('not.exist')
  })

  it('initial state — Example 1: Start button is visible before clicking', () => {
    cy.visit('/dynamic_loading/1')
    cy.get('#start button').should('be.visible')
  })

  it('initial state — Example 2: Start button is visible before clicking', () => {
    cy.visit('/dynamic_loading/2')
    cy.get('#start button').should('be.visible')
  })

  it('happy path — Example 1: loading indicator appears while waiting', () => {
    cy.visit('/dynamic_loading/1')
    cy.get('#start button').click()
    cy.get('#loading').should('be.visible')
  })

  it('happy path — Example 2: loading indicator appears while waiting', () => {
    cy.visit('/dynamic_loading/2')
    cy.get('#start button').click()
    cy.get('#loading').should('be.visible')
  })

  it('happy path — Example 1: hidden element revealed after clicking Start', () => {
    cy.visit('/dynamic_loading/1')
    cy.get('#start button').click()
    cy.get('#finish h4', { timeout: 15000 }).should('be.visible').and('have.text', 'Hello World!')
  })

  it('happy path — Example 2: element rendered after clicking Start', () => {
    cy.visit('/dynamic_loading/2')
    cy.get('#start button').click()
    cy.get('#finish h4', { timeout: 15000 }).should('be.visible').and('have.text', 'Hello World!')
  })
})

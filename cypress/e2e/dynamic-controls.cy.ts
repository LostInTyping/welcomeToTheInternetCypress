describe('Dynamic Controls', () => {
  beforeEach(() => {
    cy.visit('/dynamic_controls')
  })

  it('happy path — page heading is visible', () => {
    cy.get('h3').should('have.text', 'Dynamic Controls')
  })

  it('initial state — input is disabled by default', () => {
    cy.get('#input-example input[type="text"]').should('be.disabled')
  })

  it('happy path — Remove button hides checkbox with message "It\'s gone!"', () => {
    cy.get('#checkbox-example #checkbox').should('exist')
    cy.get('#checkbox-example button').contains('Remove').click()
    cy.get('#checkbox-example #loading').should('be.visible')
    cy.get('#checkbox-example #checkbox').should('not.exist')
    cy.get('#checkbox-example #message').should('have.text', "It's gone!")
  })

  it('happy path — Add restores checkbox with message "It\'s back!"', () => {
    cy.get('#checkbox-example button').contains('Remove').click()
    cy.get('#checkbox-example #checkbox').should('not.exist')
    cy.get('#checkbox-example button').contains('Add').click()
    cy.get('#checkbox-example #loading').should('be.visible')
    cy.get('#checkbox-example #checkbox').should('exist')
    cy.get('#checkbox-example #message').should('have.text', "It's back!")
  })

  it('happy path — Enable button enables input with message "It\'s enabled!"', () => {
    cy.get('#input-example button').contains('Enable').click()
    cy.get('#input-example #loading').should('be.visible')
    cy.get('#input-example input[type="text"]').should('be.enabled')
    cy.get('#input-example #message').should('have.text', "It's enabled!")
  })

  it('happy path — loading indicator appears during remove operation', () => {
    cy.get('#checkbox-example button').contains('Remove').click()
    cy.get('#checkbox-example #loading').should('be.visible')
    cy.get('#checkbox-example #loading').should('not.exist')
  })

  it('happy path — after enabling, type into input and verify value', () => {
    cy.get('#input-example button').contains('Enable').click()
    cy.get('#input-example input[type="text"]').should('be.enabled')
    cy.get('#input-example input[type="text"]').type('Hello World')
    cy.get('#input-example input[type="text"]').should('have.value', 'Hello World')
  })

  it('happy path — Disable after Enable makes input disabled again with "It\'s disabled!"', () => {
    cy.get('#input-example button').contains('Enable').click()
    cy.get('#input-example input[type="text"]').should('be.enabled')
    cy.get('#input-example button').contains('Disable').click()
    cy.get('#input-example #loading').should('be.visible')
    cy.get('#input-example input[type="text"]').should('be.disabled')
    cy.get('#input-example #message').should('have.text', "It's disabled!")
  })
})

describe('Entry Ad', () => {
  beforeEach(() => {
    cy.visit('/entry_ad')
  })

  it('happy path — modal appears on load with title "THIS IS A MODAL WINDOW"', () => {
    cy.get('.modal', { timeout: 5000 }).should('be.visible')
    cy.get('.modal-title h3').should('have.text', 'THIS IS A MODAL WINDOW')
  })

  it('happy path — modal overlay is visible when modal shows', () => {
    cy.get('.modal', { timeout: 5000 }).should('be.visible')
    cy.get('.modal-backdrop').should('be.visible')
  })

  it('happy path — modal has expected structure (title, body text, footer close button)', () => {
    cy.get('.modal', { timeout: 5000 }).should('be.visible')
    cy.get('.modal-title h3').should('exist')
    cy.get('.modal-body').should('exist').and('not.be.empty')
    cy.get('.modal-footer p').should('exist')
  })

  it('happy path — modal closes on clicking footer close link', () => {
    cy.get('.modal', { timeout: 5000 }).should('be.visible')
    cy.get('.modal-footer p').click()
    cy.get('.modal').should('not.be.visible')
  })

  it('happy path — modal content is no longer visible after close', () => {
    cy.get('.modal', { timeout: 5000 }).should('be.visible')
    cy.get('.modal-footer p').click()
    cy.get('.modal-title').should('not.be.visible')
  })

  it('happy path — modal does not reappear within the same visit after being closed', () => {
    cy.get('.modal', { timeout: 5000 }).should('be.visible')
    cy.get('.modal-footer p').click()
    cy.get('.modal').should('not.be.visible')
    cy.wait(2000)
    cy.get('.modal').should('not.be.visible')
  })
})

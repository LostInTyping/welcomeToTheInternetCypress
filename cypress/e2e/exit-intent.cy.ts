describe('Exit Intent', () => {
  beforeEach(() => {
    cy.visit('/exit_intent')
  })

  it('happy path — page heading is visible', () => {
    cy.get('h3').should('have.text', 'Exit Intent')
  })

  it('initial state — modal is hidden on load', () => {
    cy.get('#ouibounce-modal').should('not.be.visible')
  })

  it('happy path — mouseleave on body makes modal visible', () => {
    cy.get('body').trigger('mouseleave')
    cy.get('#ouibounce-modal').should('be.visible')
  })

  it('happy path — modal has title "THIS IS A MODAL WINDOW"', () => {
    cy.get('body').trigger('mouseleave')
    cy.get('#ouibounce-modal .modal-title h3').should('have.text', 'THIS IS A MODAL WINDOW')
  })

  it('happy path — modal has Close button', () => {
    cy.get('body').trigger('mouseleave')
    cy.get('#ouibounce-modal .modal-footer p').should('contain.text', 'Close')
  })

  it('happy path — Close button hides modal again', () => {
    cy.get('body').trigger('mouseleave')
    cy.get('#ouibounce-modal').should('be.visible')
    cy.get('#ouibounce-modal .modal-footer p').click()
    cy.get('#ouibounce-modal').should('not.be.visible')
  })
})

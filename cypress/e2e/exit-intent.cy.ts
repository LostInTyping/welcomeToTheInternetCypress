describe('Exit Intent', () => {
  beforeEach(() => {
    cy.visit('/exit_intent')
  })

  function triggerExitIntent() {
    cy.window().then((win) => {
      const event = new win.MouseEvent('mouseleave', {
        bubbles: false,
        cancelable: false,
        clientY: -10,
      })
      win.document.documentElement.dispatchEvent(event)
    })
  }

  it('happy path — page heading is visible', () => {
    cy.contains('h3', 'Exit Intent').should('be.visible')
  })

  it('initial state — modal is hidden on load', () => {
    cy.get('#ouibounce-modal').should('not.be.visible')
  })

  it('happy path — mouseleave triggers modal to appear', () => {
    triggerExitIntent()
    cy.get('#ouibounce-modal').should('be.visible')
  })

  it('happy path — modal has expected title', () => {
    triggerExitIntent()
    cy.get('#ouibounce-modal .modal-title h3').should('have.text', 'This is a modal window')
  })

  it('happy path — modal has Close button', () => {
    triggerExitIntent()
    cy.get('#ouibounce-modal .modal-footer p').should('contain.text', 'Close')
  })

  it('happy path — Close button hides modal again', () => {
    triggerExitIntent()
    cy.get('#ouibounce-modal').should('be.visible')
    cy.get('#ouibounce-modal .modal-footer p').click()
    cy.get('#ouibounce-modal').should('not.be.visible')
  })
})

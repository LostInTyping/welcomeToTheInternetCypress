describe('Notification Messages', () => {
  beforeEach(() => {
    cy.visit('/notification_message_rendered')
  })

  it('happy path — page heading is visible', () => {
    cy.get('h3').should('have.text', 'Notification Message')
  })

  it('happy path — "Click here" link exists', () => {
    cy.contains('.example a', 'Click here').should('exist')
  })

  it('happy path — clicking "Click here" shows visible #flash', () => {
    cy.contains('.example a', 'Click here').click()
    cy.get('#flash').should('be.visible')
  })

  it('happy path — flash text matches expected notification pattern', () => {
    cy.contains('.example a', 'Click here').click()
    cy.get('#flash').invoke('text').invoke('trim')
      .should('match', /Action successful|Action unsuccesful|Action completed/)
  })

  it('happy path — flash message has a close link', () => {
    cy.contains('.example a', 'Click here').click()
    cy.get('#flash .close').should('exist')
  })

  it('happy path — 3 successive clicks each show a flash message', () => {
    for (let i = 0; i < 3; i++) {
      cy.contains('.example a', 'Click here').click()
      cy.get('#flash').should('be.visible')
      cy.get('#flash').invoke('text').invoke('trim')
        .should('match', /Action successful|Action unsuccesful|Action completed/)
    }
  })
})

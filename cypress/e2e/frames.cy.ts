describe('Frames', () => {
  it('happy path — /frames page heading is present', () => {
    cy.visit('/frames')
    cy.get('h3').should('have.text', 'Frames')
  })

  it('happy path — /frames shows both iFrame and Nested Frames links', () => {
    cy.visit('/frames')
    cy.contains('a', 'iFrame').should('be.visible')
    cy.contains('a', 'Nested Frames').should('be.visible')
  })

  it('happy path — /iframe contains iframe#mce_0_ifr', () => {
    cy.visit('/iframe')
    cy.get('iframe#mce_0_ifr').should('exist')
  })

  it('happy path — iframe body contains default text', () => {
    cy.visit('/iframe')
    cy.get('iframe[id^="mce_"][id$="_ifr"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .and('contain.text', 'Your content goes here.')
  })

  it('negative — page heading does not contain iframe body text', () => {
    cy.visit('/iframe')
    cy.get('.example h3').should('not.contain.text', 'Your content goes here.')
  })

  it('happy path — TinyMCE editor toolbar is present', () => {
    cy.visit('/iframe')
    cy.get('.tox-menubar, .mce-menubar').should('exist')
  })
})

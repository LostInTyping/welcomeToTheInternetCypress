describe('WYSIWYG Editor', () => {
  beforeEach(() => {
    cy.visit('/tinymce')
  })

  it('happy path — page heading is present', () => {
    cy.contains('h3', 'An iFrame containing the TinyMCE WYSIWYG Editor')
  })

  it('happy path — iframe exists', () => {
    cy.get('iframe#mce_0_ifr').should('exist')
  })

  it('happy path — TinyMCE toolbar is present', () => {
    cy.get('.mce-toolbar, .tox-toolbar, [role="toolbar"]').should('exist')
  })

  it('happy path — default content is present before editing', () => {
    cy.get('iframe#mce_0_ifr')
      .its('0.contentDocument.body')
      .should('contain', 'Your content goes here.')
  })

  it('happy path — can clear and type new content', () => {
    cy.get('iframe#mce_0_ifr')
      .its('0.contentDocument.body')
      .then(($body) => {
        cy.wrap($body).clear()
        cy.wrap($body).type('Hello Cypress WYSIWYG!')
        cy.wrap($body).should('contain', 'Hello Cypress WYSIWYG!')
      })
  })

  it('happy path — cleared content is gone before typing', () => {
    cy.get('iframe#mce_0_ifr')
      .its('0.contentDocument.body')
      .then(($body) => {
        cy.wrap($body).clear()
        cy.wrap($body).should('not.contain', 'Your content goes here.')
      })
  })

  it('encapsulation — outer body does not contain iframe text', () => {
    cy.get('body').should('not.contain', 'Your content goes here.')
  })
})

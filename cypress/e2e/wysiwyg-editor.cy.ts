describe('WYSIWYG Editor', () => {
  beforeEach(() => {
    cy.visit('/tinymce')
  })

  it('happy path ⋙ page heading is present', () => {
    cy.contains('h3', 'An iFrame containing the TinyMCE WYSIWYG Editor')
  })

  it('happy path ⋙ iframe exists', () => {
    cy.get('iframe#mce_0_ifr').should('exist')
  })

  it('happy path ⋙ TinyMCE toolbar is present', () => {
    cy.get('.mce-toolbar, .tox-toolbar, [role="toolbar"]').should('exist')
  })

  it('happy path ⋙ default content is present before editing', () => {
    cy.get('iframe#mce_0_ifr')
      .its('0.contentDocument.body')
      .should('contain', 'Your content goes here.')
  })

  it('happy path ⋙ can set and read content via TinyMCE API', () => {
    cy.window().its('tinyMCE.activeEditor', { timeout: 15000 }).then((editor) => {
      editor.setContent('<p>Hello Cypress WYSIWYG!</p>')
      expect(editor.getContent()).to.contain('Hello Cypress WYSIWYG!')
    })
  })

  it('happy path ⋙ clearing content removes default text', () => {
    cy.window().its('tinyMCE.activeEditor', { timeout: 15000 }).then((editor) => {
      editor.setContent('')
      expect(editor.getContent()).to.not.contain('Your content goes here.')
    })
  })

  it('encapsulation ⋙ original textarea serves as backing store', () => {
    cy.get('.example textarea').should('exist')
    cy.get('iframe#mce_0_ifr')
      .its('0.contentDocument.body')
      .should('contain', 'Your content goes here.')
  })
})

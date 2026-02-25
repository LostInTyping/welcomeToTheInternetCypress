describe('WYSIWYG Editor', () => {
  beforeEach(() => {
    cy.visit('/tinymce')
  })

  // TODO: Verify page heading "An iFrame containing the TinyMCE WYSIWYG Editor"
  // TODO: iframe#mce_0_ifr exists
  // TODO: Verify TinyMCE toolbar/menu bar is present
  // TODO: Verify default content "Your content goes here." is present before editing
  //   Pattern: cy.get('iframe#mce_0_ifr').its('0.contentDocument.body')
  // TODO: Can clear iframe body and type "Hello Cypress WYSIWYG!" and verify
  // TODO: Verify cleared content is gone (empty state before typing)
  // TODO: Outer body does not contain "Your content goes here."
})

describe('Shadow DOM', () => {
  beforeEach(() => {
    cy.visit('/shadowdom')
  })

  // TODO: Verify page heading "Shadow DOM"
  // TODO: my-paragraph element exists on the page
  // TODO: Shadow root is accessible via .shadow()
  // TODO: .shadow().find('p') contains "Let's have some different text!"
  // TODO: Outer body does not contain that text directly (encapsulation)
  // TODO: Verify second my-paragraph element also has shadow content (if present)
})

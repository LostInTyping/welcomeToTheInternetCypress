describe('Multiple Windows', () => {
  beforeEach(() => {
    cy.visit('/windows')
  })

  // TODO: Verify page heading "Opening a new window"
  // TODO: Verify link text is "Click Here"
  // TODO: "Click Here" link has target='_blank'
  // TODO: Link href = /windows/new
  // TODO: After removing target attribute and clicking, navigates to /windows/new
  // TODO: New page has h3 "New Window"
  // TODO: Alternative: stub window.open and verify it was called with correct URL
})

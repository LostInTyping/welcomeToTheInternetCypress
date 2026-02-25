describe('Secure File Download', () => {
  // TODO: Authenticated visit to /download_secure shows h3 "Secure File Downloader"
  //   Use: cy.visit('https://admin:admin@the-internet.herokuapp.com/download_secure')
  // TODO: Authenticated page shows > 0 download links
  // TODO: Download links have non-empty text (filenames)
  // TODO: Unauthenticated cy.request returns 401
  // TODO: Wrong credentials via cy.request return 401
  // TODO: cy.request with correct auth to a specific download link returns 200
})

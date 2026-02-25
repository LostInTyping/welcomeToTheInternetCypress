describe('Secure File Download', () => {
  it('happy path — authenticated visit shows h3 "Secure File Downloader"', () => {
    cy.visit('https://admin:admin@the-internet.herokuapp.com/download_secure')
    cy.contains('h3', 'Secure File Downloader')
  })

  it('happy path — authenticated page shows download links', () => {
    cy.visit('https://admin:admin@the-internet.herokuapp.com/download_secure')
    cy.get('.example a').should('have.length.greaterThan', 0)
  })

  it('happy path — download links have non-empty text', () => {
    cy.visit('https://admin:admin@the-internet.herokuapp.com/download_secure')
    cy.get('.example a').each(($a) => {
      cy.wrap($a).invoke('text').invoke('trim').should('not.be.empty')
    })
  })

  it('negative — unauthenticated request returns 401', () => {
    cy.request({
      url: 'https://the-internet.herokuapp.com/download_secure',
      failOnStatusCode: false,
    }).its('status').should('eq', 401)
  })

  it('negative — wrong credentials return 401', () => {
    cy.request({
      url: 'https://the-internet.herokuapp.com/download_secure',
      headers: {
        Authorization: `Basic ${btoa('wrong:credentials')}`,
      },
      failOnStatusCode: false,
    }).its('status').should('eq', 401)
  })

  it('happy path — request with correct auth to a download link returns 200', () => {
    cy.visit('https://admin:admin@the-internet.herokuapp.com/download_secure')
    cy.get('.example a').first().then(($a) => {
      const href = $a.attr('href')
      cy.request({
        url: `https://the-internet.herokuapp.com${href}`,
        auth: { username: 'admin', password: 'admin' },
      }).its('status').should('eq', 200)
    })
  })
})

describe('Basic Auth', () => {
  it('happy path — authenticated visit shows success message', () => {
    // Must use full URL, not baseUrl, because credentials go in the origin
    cy.visit('https://admin:admin@the-internet.herokuapp.com/basic_auth')
    cy.get('.example').should('contain', 'Congratulations!')
  })

  it('happy path — success page displays full auth confirmation', () => {
    cy.visit('https://admin:admin@the-internet.herokuapp.com/basic_auth')
    cy.get('.example p').should('contain', 'You must have the proper credentials')
  })

  it('negative — request without credentials returns 401', () => {
    cy.request({
      url: 'https://the-internet.herokuapp.com/basic_auth',
      failOnStatusCode: false,
    }).its('status').should('eq', 401)
  })

  it('negative — wrong credentials return 401', () => {
    cy.request({
      url: 'https://the-internet.herokuapp.com/basic_auth',
      headers: {
        Authorization: `Basic ${btoa('wrong:credentials')}`,
      },
      failOnStatusCode: false,
    }).its('status').should('eq', 401)
  })

  it('negative — 401 response includes WWW-Authenticate header', () => {
    cy.request({
      url: 'https://the-internet.herokuapp.com/basic_auth',
      failOnStatusCode: false,
    }).its('headers').should('have.property', 'www-authenticate')
  })
})

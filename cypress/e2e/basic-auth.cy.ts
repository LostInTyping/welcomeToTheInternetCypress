describe('Basic Auth', () => {
  it('happy path — authenticated visit shows success message', () => {
    // Must use full URL, not baseUrl, because credentials go in the origin
    cy.visit('https://admin:admin@the-internet.herokuapp.com/basic_auth')
    cy.get('.example').should('contain', 'Congratulations!')
  })

  it('negative — request without credentials returns 401', () => {
    cy.request({
      url: 'https://the-internet.herokuapp.com/basic_auth',
      failOnStatusCode: false,
    }).its('status').should('eq', 401)
  })
})

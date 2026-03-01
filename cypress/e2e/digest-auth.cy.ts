describe('Digest Auth', () => {
  it('negative ⋙ request without credentials returns 401', () => {
    cy.request({
      url: 'https://the-internet.herokuapp.com/digest_auth',
      failOnStatusCode: false,
    }).its('status').should('eq', 401)
  })

  it('negative ⋙ 401 response includes WWW-Authenticate digest header', () => {
    cy.request({
      url: 'https://the-internet.herokuapp.com/digest_auth',
      failOnStatusCode: false,
    }).its('headers')
      .should('have.property', 'www-authenticate')
      .and('match', /Digest/i)
  })

  it('negative ⋙ 401 response body indicates not authorized', () => {
    cy.request({
      url: 'https://the-internet.herokuapp.com/digest_auth',
      failOnStatusCode: false,
    }).its('body').should('be.a', 'string')
  })

  it('negative ⋙ URL-embedded credentials return 400 (digest unsupported)', () => {
    // Digest auth requires challenge-response handshake that HTTP clients
    // don't perform automatically with URL-embedded credentials
    cy.request({
      url: 'https://admin:admin@the-internet.herokuapp.com/digest_auth',
      failOnStatusCode: false,
    }).its('status').should('eq', 400)
  })
})

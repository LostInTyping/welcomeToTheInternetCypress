type BasicAuthCredentialsFixture = {
  basicAuth: {
    username: string
    password: string
  }
}

describe('Basic Auth', () => {
  let username = ''
  let password = ''

  before(() => {
    cy.fixture<BasicAuthCredentialsFixture>('credentials').then(({ basicAuth }) => {
      username = basicAuth.username
      password = basicAuth.password
    })
  })

  const authUrl = () =>
    `https://${username}:${password}@the-internet.herokuapp.com/basic_auth`

  it('happy path ⋙ authenticated visit shows success message', () => {
    cy.visit(authUrl())
    cy.get('.example').should('contain', 'Congratulations!')
  })

  it('happy path ⋙ success page displays full auth confirmation', () => {
    cy.visit(authUrl())
    cy.get('.example p').should('contain', 'You must have the proper credentials')
  })

  it('negative ⋙ request without credentials returns 401', () => {
    cy.request({
      url: 'https://the-internet.herokuapp.com/basic_auth',
      failOnStatusCode: false,
    }).its('status').should('eq', 401)
  })

  it('negative ⋙ wrong credentials return 401', () => {
    cy.request({
      url: 'https://the-internet.herokuapp.com/basic_auth',
      headers: {
        Authorization: `Basic ${btoa('wrong:credentials')}`,
      },
      failOnStatusCode: false,
    }).its('status').should('eq', 401)
  })

  it('negative ⋙ 401 response includes WWW-Authenticate header', () => {
    cy.request({
      url: 'https://the-internet.herokuapp.com/basic_auth',
      failOnStatusCode: false,
    }).its('headers').should('have.property', 'www-authenticate')
  })
})

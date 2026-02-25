describe('Status Codes', () => {
  beforeEach(() => {
    cy.visit('/status_codes')
  })

  it('happy path — page heading is present', () => {
    cy.contains('h3', 'Status Codes')
  })

  it('happy path — links for 200, 301, 404, 500 all exist', () => {
    cy.get('.example ul a').should('have.length', 4)
  })

  it('happy path — each link has expected text content', () => {
    ['200', '301', '404', '500'].forEach((code) => {
      cy.get('.example a').contains(code).should('exist')
    })
  })

  it('happy path — request to /status_codes/200 returns 200', () => {
    cy.request('/status_codes/200').its('status').should('eq', 200)
  })

  it('happy path — request to /status_codes/301 returns 301', () => {
    cy.request({
      url: '/status_codes/301',
      followRedirect: false,
    }).its('status').should('eq', 301)
  })

  it('negative — request to /status_codes/404 returns 404', () => {
    cy.request({
      url: '/status_codes/404',
      failOnStatusCode: false,
    }).its('status').should('eq', 404)
  })

  it('negative — request to /status_codes/500 returns 500', () => {
    cy.request({
      url: '/status_codes/500',
      failOnStatusCode: false,
    }).its('status').should('eq', 500)
  })

  it('happy path — each status code page shows descriptive text', () => {
    ['200', '301', '404', '500'].forEach((code) => {
      cy.visit(`/status_codes/${code}`, { failOnStatusCode: false })
      cy.get('.example p').invoke('text').invoke('trim').should('not.be.empty')
    })
  })
})

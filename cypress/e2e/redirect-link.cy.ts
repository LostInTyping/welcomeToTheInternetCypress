describe('Redirect Link', () => {
  beforeEach(() => {
    cy.visit('/redirector')
  })

  it('happy path ⋙ page heading is visible', () => {
    cy.get('h3').should('have.text', 'Redirection')
  })

  it('happy path ⋙ redirect link exists with text "here"', () => {
    cy.get('a#redirect').should('have.text', 'here')
  })

  it('happy path ⋙ link href points to expected redirect path', () => {
    cy.get('a#redirect').should('have.attr', 'href', 'redirect')
  })

  it('happy path ⋙ clicking link navigates to /status_codes', () => {
    cy.get('a#redirect').click()
    cy.url().should('include', '/status_codes')
  })

  it('happy path ⋙ /status_codes page has expected content', () => {
    cy.get('a#redirect').click()
    cy.get('h3').should('have.text', 'Status Codes')
    cy.get('.example').should('contain.text', '200')
    cy.get('.example').should('contain.text', '301')
    cy.get('.example').should('contain.text', '404')
    cy.get('.example').should('contain.text', '500')
  })

  it('edge case ⋙ cy.request follows redirect to /status_codes', () => {
    cy.request({
      url: '/redirect',
      followRedirect: false,
    }).then((resp) => {
      expect(resp.status).to.be.oneOf([301, 302])
      expect(resp.redirectedToUrl || resp.headers['location']).to.include('status_codes')
    })
  })
})

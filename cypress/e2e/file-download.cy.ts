describe('File Download', () => {
  beforeEach(() => {
    cy.visit('/download')
  })

  it('happy path ⋙ page heading is visible', () => {
    cy.get('h3').should('have.text', 'File Downloader')
  })

  it('happy path ⋙ download links exist', () => {
    cy.get('.example a').should('have.length.gt', 0)
  })

  it('happy path ⋙ all links have non-empty href attributes', () => {
    cy.get('.example a').each(($a) => {
      cy.wrap($a).should('have.attr', 'href').and('not.be.empty')
    })
  })

  it('happy path ⋙ first link returns HTTP 200 via cy.request', () => {
    cy.get('.example a').first().invoke('attr', 'href').then((href) => {
      cy.request('/' + href).its('status').should('eq', 200)
    })
  })

  it('happy path ⋙ first link response has a Content-Type header', () => {
    cy.get('.example a').first().invoke('attr', 'href').then((href) => {
      cy.request('/' + href).its('headers').should('have.property', 'content-type')
    })
  })
})

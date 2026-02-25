describe('JavaScript Error', () => {
  it('happy path — page loads despite JS error', () => {
    cy.on('uncaught:exception', () => false)
    cy.visit('/javascript_error')
    cy.get('body').should('be.visible')
  })

  it('edge case — JS error does occur on load', () => {
    const errorStub = cy.stub()
    cy.on('uncaught:exception', (err) => {
      errorStub(err.message)
      return false
    })

    cy.visit('/javascript_error').then(() => {
      expect(errorStub).to.have.been.called
    })
  })

  it('edge case — error message contains expected content', () => {
    const errors: string[] = []
    cy.on('uncaught:exception', (err) => {
      errors.push(err.message)
      return false
    })

    cy.visit('/javascript_error').then(() => {
      expect(errors.length).to.be.greaterThan(0)
      expect(errors.some((msg) => msg.includes('Cannot read'))).to.be.true
    })
  })

  it('happy path — page body still renders despite the error', () => {
    cy.on('uncaught:exception', () => false)
    cy.visit('/javascript_error')
    cy.get('body').invoke('text').invoke('trim').should('not.be.empty')
  })
})

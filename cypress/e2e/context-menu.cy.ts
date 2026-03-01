describe('Context Menu', () => {
  beforeEach(() => {
    cy.visit('/context_menu')
  })

  it('happy path ⋙ page heading is visible', () => {
    cy.get('h3').should('have.text', 'Context Menu')
  })

  it('happy path ⋙ hot-spot element is visible', () => {
    cy.get('#hot-spot').should('be.visible')
  })

  it('happy path ⋙ right-clicking hot-spot triggers alert', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.get('#hot-spot').rightclick().then(() => {
      expect(stub).to.have.been.calledOnce
      expect(stub).to.have.been.calledWith('You selected a context menu')
    })
  })

  it('negative ⋙ left-clicking hot-spot does not trigger alert', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.get('#hot-spot').click().then(() => {
      expect(stub).to.not.have.been.called
    })
  })

  it('happy path ⋙ page returns to normal state after dismissing alert', () => {
    cy.on('window:alert', () => true)
    cy.get('#hot-spot').rightclick()
    cy.get('#hot-spot').should('be.visible')
    cy.get('h3').should('have.text', 'Context Menu')
  })
})

describe('Checkboxes', () => {
  beforeEach(() => {
    cy.visit('/checkboxes')
  })

  it('happy path — page heading is present', () => {
    cy.contains('h3', 'Checkboxes')
  })

  it('happy path — exactly two checkboxes exist', () => {
    cy.get('#checkboxes input[type="checkbox"]').should('have.length', 2)
  })

  it('initial state — first checkbox is unchecked by default', () => {
    cy.get('#checkboxes input[type="checkbox"]').eq(0).should('not.be.checked')
  })

  it('initial state — second checkbox is checked by default', () => {
    cy.get('#checkboxes input[type="checkbox"]').eq(1).should('be.checked')
  })

  it('happy path — first checkbox can be checked', () => {
    cy.get('#checkboxes input[type="checkbox"]').eq(0).check()
    cy.get('#checkboxes input[type="checkbox"]').eq(0).should('be.checked')
  })

  it('happy path — second checkbox can be unchecked', () => {
    cy.get('#checkboxes input[type="checkbox"]').eq(1).uncheck()
    cy.get('#checkboxes input[type="checkbox"]').eq(1).should('not.be.checked')
  })

  it('happy path — both checkboxes are enabled', () => {
    cy.get('#checkboxes input[type="checkbox"]').each(($cb) => {
      cy.wrap($cb).should('be.enabled')
    })
  })

  it('roundtrip — toggling first checkbox tracks state correctly', () => {
    const checkbox = () => cy.get('#checkboxes input[type="checkbox"]').eq(0)
    checkbox().should('not.be.checked')
    checkbox().check()
    checkbox().should('be.checked')
    checkbox().uncheck()
    checkbox().should('not.be.checked')
    checkbox().check()
    checkbox().should('be.checked')
  })
})

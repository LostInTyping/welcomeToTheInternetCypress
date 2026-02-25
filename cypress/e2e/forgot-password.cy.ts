describe('Forgot Password', () => {
  beforeEach(() => {
    cy.visit('/forgot_password')
  })

  it('happy path — page heading is present', () => {
    cy.contains('h2', 'Forgot Password')
  })

  it('happy path — email input and submit button are visible', () => {
    cy.get('#email').should('be.visible')
    cy.get('#form_submit').should('be.visible')
  })

  it('happy path — button text says Retrieve password', () => {
    cy.get('#form_submit').should('contain.text', 'Retrieve password')
  })

  it('happy path — email field accepts input', () => {
    cy.get('#email').type('test@example.com')
    cy.get('#email').should('have.value', 'test@example.com')
  })

  it('negative — submitting empty form stays on the same URL', () => {
    cy.get('#form_submit').click()
    cy.url().should('include', '/forgot_password')
  })
})

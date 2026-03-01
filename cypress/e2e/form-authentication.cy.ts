type FormAuthCredentialsFixture = {
  formAuth: {
    username: string
    password: string
  }
}

describe('Form Authentication', () => {
  let username = ''
  let password = ''

  before(() => {
    cy.fixture<FormAuthCredentialsFixture>('credentials').then(({ formAuth }) => {
      username = formAuth.username
      password = formAuth.password
    })
  })

  beforeEach(() => {
    cy.visit('/login')
  })

  it('happy path ⋙ login page has username, password, and Login button', () => {
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('happy path ⋙ valid login redirects to /secure with success flash', () => {
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/secure')
    cy.get('#flash').should('contain.text', 'You logged into a secure area!')
  })

  it('happy path ⋙ /secure page heading says Secure Area', () => {
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('button[type="submit"]').click()
    cy.get('h2').should('contain.text', 'Secure Area')
  })

  it('happy path ⋙ cy.login() custom command logs in successfully', () => {
    cy.login(username, password)
    cy.url().should('include', '/secure')
    cy.get('#flash').should('contain.text', 'You logged into a secure area!')
  })

  it('happy path ⋙ flash close button dismisses the message', () => {
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('button[type="submit"]').click()
    cy.get('#flash').should('be.visible')
    cy.get('#flash .close').click({ force: true })
    cy.get('#flash').should('not.exist')
  })

  it('happy path ⋙ logout navigates back to /login', () => {
    cy.login(username, password)
    cy.get('a[href="/logout"]').click()
    cy.url().should('include', '/login')
    cy.get('#flash').should('contain.text', 'You logged out of the secure area!')
  })

  it('negative ⋙ invalid username shows error flash', () => {
    cy.get('#username').type('invaliduser')
    cy.get('#password').type(password)
    cy.get('button[type="submit"]').click()
    cy.get('#flash').should('contain.text', 'Your username is invalid!')
  })

  it('negative ⋙ invalid password shows error flash', () => {
    cy.get('#username').type(username)
    cy.get('#password').type('wrongpassword')
    cy.get('button[type="submit"]').click()
    cy.get('#flash').should('contain.text', 'Your password is invalid!')
  })

  it('negative ⋙ empty username and password shows error flash', () => {
    cy.get('button[type="submit"]').click()
    cy.get('#flash').should('contain.text', 'Your username is invalid!')
  })
})

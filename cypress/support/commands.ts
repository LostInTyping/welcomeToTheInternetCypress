Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/login')
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('button[type="submit"]').click()
})
Cypress.Commands.add('getBySel', (selector: string, ...args: unknown[]) => {
  return cy.get(`[data-test="${selector}"]`, ...(args as []))
})

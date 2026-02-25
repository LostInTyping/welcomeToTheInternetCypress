declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): Chainable<void>
    getBySel(selector: string, ...args: unknown[]): Chainable<JQuery<HTMLElement>>
  }
}

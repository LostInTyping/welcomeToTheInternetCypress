describe('Key Presses', () => {
  beforeEach(() => {
    cy.visit('/key_presses')
  })

  it('happy path — page heading is visible', () => {
    cy.get('h3').should('have.text', 'Key Presses')
  })

  it('happy path — input field exists and is visible', () => {
    cy.get('#target').should('be.visible')
  })

  it('initial state — result is empty before any key press', () => {
    cy.get('#result').should('have.text', '')
  })

  it('happy path — pressing "a" shows "You entered: A"', () => {
    cy.get('#target').type('a')
    cy.get('#result').should('have.text', 'You entered: A')
  })

  it('happy path — pressing ENTER shows "You entered: ENTER"', () => {
    cy.get('#target').type('{enter}')
    cy.get('#result').should('have.text', 'You entered: ENTER')
  })

  it('happy path — pressing TAB shows "You entered: TAB"', () => {
    cy.get('#target').trigger('keydown', { key: 'Tab', keyCode: 9 })
    cy.get('#result').should('have.text', 'You entered: TAB')
  })

  it('happy path — pressing ESCAPE shows "You entered: ESCAPE"', () => {
    cy.get('#target').type('{esc}')
    cy.get('#result').should('have.text', 'You entered: ESCAPE')
  })

  it('happy path — pressing BACKSPACE shows "You entered: BACK_SPACE"', () => {
    cy.get('#target').type('{backspace}')
    cy.get('#result').should('have.text', 'You entered: BACK_SPACE')
  })

  it('happy path — consecutive key presses update the result each time', () => {
    cy.get('#target').type('a')
    cy.get('#result').should('have.text', 'You entered: A')

    cy.get('#target').type('b')
    cy.get('#result').should('have.text', 'You entered: B')
  })
})

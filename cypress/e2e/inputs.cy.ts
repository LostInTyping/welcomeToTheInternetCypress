describe('Inputs', () => {
  beforeEach(() => {
    cy.visit('/inputs')
  })

  it('happy path — page heading is visible', () => {
    cy.get('h3').should('have.text', 'Inputs')
  })

  it('happy path — input type is "number"', () => {
    cy.get('input[type="number"]').should('exist')
  })

  it('happy path — number input accepts 42', () => {
    cy.get('input[type="number"]').type('42')
    cy.get('input[type="number"]').should('have.value', '42')
  })

  it('happy path — up arrow key increments value from 10 to 11', () => {
    cy.get('input[type="number"]').type('10')
    cy.get('input[type="number"]').type('{upArrow}')
    cy.get('input[type="number"]').should('have.value', '11')
  })

  it('happy path — down arrow key decrements value from 10 to 9', () => {
    cy.get('input[type="number"]').type('10')
    cy.get('input[type="number"]').type('{downArrow}')
    cy.get('input[type="number"]').should('have.value', '9')
  })

  it('negative — alphabetic input results in empty value', () => {
    cy.get('input[type="number"]').type('abc')
    cy.get('input[type="number"]').should('have.value', '')
  })

  it('happy path — negative numbers are accepted', () => {
    cy.get('input[type="number"]').type('-5')
    cy.get('input[type="number"]').should('have.value', '-5')
  })
})

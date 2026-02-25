describe('Dropdown', () => {
  beforeEach(() => {
    cy.visit('/dropdown')
  })

  it('happy path — page heading is visible', () => {
    cy.get('h3').should('have.text', 'Dropdown List')
  })

  it('initial state — placeholder option is selected', () => {
    cy.get('#dropdown option').first().should('be.selected')
  })

  it('happy path — exactly 3 option elements exist', () => {
    cy.get('#dropdown option').should('have.length', 3)
  })

  it('initial state — placeholder option is disabled', () => {
    cy.get('#dropdown option').first().should('be.disabled')
  })

  it('happy path — can select Option 1', () => {
    cy.get('#dropdown').select('1')
    cy.get('#dropdown').should('have.value', '1')
  })

  it('happy path — can select Option 2', () => {
    cy.get('#dropdown').select('2')
    cy.get('#dropdown').should('have.value', '2')
  })

  it('happy path — switching from Option 1 to Option 2 updates value', () => {
    cy.get('#dropdown').select('1')
    cy.get('#dropdown').should('have.value', '1')
    cy.get('#dropdown').select('2')
    cy.get('#dropdown').should('have.value', '2')
  })
})

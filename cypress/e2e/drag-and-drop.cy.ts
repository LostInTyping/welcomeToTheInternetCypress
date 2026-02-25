describe('Drag and Drop', () => {
  beforeEach(() => {
    cy.visit('/drag_and_drop')
  })

  it('happy path — page heading is visible', () => {
    cy.get('h3').should('have.text', 'Drag and Drop')
  })

  it('initial state — Column A is in the first position', () => {
    cy.get('#columns #column-a header').should('have.text', 'A')
  })

  it('initial state — Column B is in the second position', () => {
    cy.get('#columns #column-b header').should('have.text', 'B')
  })

  it('happy path — dragging Column A onto Column B swaps them', () => {
    const dataTransfer = new DataTransfer()

    cy.get('#column-a').trigger('dragstart', { dataTransfer })
    cy.get('#column-b').trigger('dragenter', { dataTransfer })
    cy.get('#column-b').trigger('dragover', { dataTransfer })
    cy.get('#column-b').trigger('drop', { dataTransfer })

    cy.get('#columns .column').eq(0).find('header').should('have.text', 'B')
    cy.get('#columns .column').eq(1).find('header').should('have.text', 'A')
  })

  it('happy path — both column containers remain present after drag', () => {
    const dataTransfer = new DataTransfer()

    cy.get('#column-a').trigger('dragstart', { dataTransfer })
    cy.get('#column-b').trigger('dragenter', { dataTransfer })
    cy.get('#column-b').trigger('dragover', { dataTransfer })
    cy.get('#column-b').trigger('drop', { dataTransfer })

    cy.get('#columns .column').should('have.length', 2)
  })
})

describe('Challenging DOM', () => {
  beforeEach(() => {
    cy.visit('/challenging_dom')
  })

  it('happy path ⋙ page heading is present', () => {
    cy.contains('h3', 'Challenging DOM')
  })

  it('happy path ⋙ three button elements are present', () => {
    cy.get('.large-2.columns a.button').should('have.length', 3)
  })

  it('happy path ⋙ table is visible with expected column headers', () => {
    const expectedHeaders = ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Diceret', 'Action']
    cy.get('table thead th').should('have.length', expectedHeaders.length)
    expectedHeaders.forEach((header) => {
      cy.get('table thead').contains('th', header)
    })
  })

  it('happy path ⋙ table has data rows', () => {
    cy.get('table tbody tr').should('have.length.greaterThan', 0)
  })

  it('happy path ⋙ each row has edit and delete action links', () => {
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).contains('a', 'edit')
      cy.wrap($row).contains('a', 'delete')
    })
  })

  it('interaction ⋙ clicking a button changes button IDs', () => {
    cy.get('.large-2.columns a.button').first().then(($btn) => {
      const originalId = $btn.attr('id')
      cy.wrap($btn).click()
      cy.get('.large-2.columns a.button').first().should(($newBtn) => {
        expect($newBtn.attr('id')).to.not.equal(originalId)
      })
    })
  })

  it('happy path ⋙ canvas element exists and has dimensions', () => {
    cy.get('canvas#canvas').should('exist')
    cy.get('canvas#canvas')
      .should('have.prop', 'width')
      .and('be.greaterThan', 0)
    cy.get('canvas#canvas')
      .should('have.prop', 'height')
      .and('be.greaterThan', 0)
  })
})

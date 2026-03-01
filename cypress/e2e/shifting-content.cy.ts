describe('Shifting Content', () => {
  beforeEach(() => {
    cy.visit('/shifting_content')
  })

  it('happy path ⋙ page heading is present', () => {
    cy.contains('h3', 'Shifting Content')
  })

  it('happy path ⋙ index page has links to all 3 examples', () => {
    cy.get('.example a').should('have.length', 3)
  })

  it('happy path ⋙ Example 1: menu has nav items with text content', () => {
    cy.visit('/shifting_content/menu')
    cy.get('.example li').should('have.length.greaterThan', 0)
    cy.get('.example li').each(($li) => {
      cy.wrap($li).invoke('text').invoke('trim').should('not.be.empty')
    })
  })

  it('happy path ⋙ Example 1: menu items are visible', () => {
    cy.visit('/shifting_content/menu')
    cy.get('.example li').each(($li) => {
      cy.wrap($li).should('be.visible')
    })
  })

  it('happy path ⋙ Example 2: image is visible despite DOM shift on reload', () => {
    cy.visit('/shifting_content/image')
    cy.get('.example img').should('be.visible')
  })

  it('happy path ⋙ Example 3: page renders with content items', () => {
    cy.visit('/shifting_content/list')
    cy.get('.example .large-6').should('exist')
    cy.get('.example .large-6').invoke('text').invoke('trim').should('not.be.empty')
  })

  it('happy path ⋙ Example 3: content includes expected static item', () => {
    cy.visit('/shifting_content/list')
    cy.get('.example .large-6').should('contain', "Important Information You're Looking For")
  })
})

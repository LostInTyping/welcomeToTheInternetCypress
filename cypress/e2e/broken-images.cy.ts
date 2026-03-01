describe('Broken Images', () => {
  beforeEach(() => {
    cy.visit('/broken_images')
  })

  it('happy path ⋙ page heading is present', () => {
    cy.contains('h3', 'Broken Images')
  })

  it('happy path ⋙ three images exist on the page', () => {
    cy.get('.example img').should('have.length', 3)
  })

  it('happy path ⋙ all images have a non-empty src attribute', () => {
    cy.get('.example img').each(($img) => {
      cy.wrap($img).should('have.attr', 'src').and('not.be.empty')
    })
  })

  it('detection ⋙ at least one image is broken (naturalWidth === 0)', () => {
    cy.get('.example img')
      .then(($imgs) => {
        const broken = $imgs.toArray().filter(
          (img) => (img as HTMLImageElement).naturalWidth === 0
        )
        expect(broken.length).to.be.greaterThan(0)
      })
  })

  it('detection ⋙ at least one image loaded successfully (naturalWidth > 0)', () => {
    cy.get('.example img')
      .then(($imgs) => {
        const loaded = $imgs.toArray().filter(
          (img) => (img as HTMLImageElement).naturalWidth > 0
        )
        expect(loaded.length).to.be.greaterThan(0)
      })
  })
})

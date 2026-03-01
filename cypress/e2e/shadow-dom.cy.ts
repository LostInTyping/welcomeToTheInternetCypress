describe('Shadow DOM', { experimentalFastVisibility: false }, () => {
  beforeEach(() => {
    cy.visit('/shadowdom')
  })

  it('happy path ⋙ page heading is present', () => {
    cy.get('h1').should('contain', 'Simple template')
  })

  it('happy path ⋙ my-paragraph element exists on the page', () => {
    cy.get('my-paragraph').should('exist')
  })

  it('happy path ⋙ shadow root is accessible', () => {
    cy.get('my-paragraph').first().should(($el) => {
      expect($el[0].shadowRoot).to.not.be.null
    })
  })

  it('happy path ⋙ shadow content contains expected text', () => {
    cy.get('my-paragraph').first().find('[slot="my-text"]')
      .should('contain', "Let's have some different text!")
  })

  it('encapsulation ⋙ outer body does not contain shadow text directly', () => {
    cy.get('body').then(($body) => {
      const bodyHtml = $body.html()
      const outerTextOnly = bodyHtml.replace(/<my-paragraph[\s\S]*?<\/my-paragraph>/g, '')
      expect(outerTextOnly).to.not.contain("Let's have some different text!")
    })
  })

  it('happy path ⋙ second my-paragraph also has shadow content', () => {
    cy.get('my-paragraph').then(($els) => {
      if ($els.length > 1) {
        cy.wrap($els.eq(1)).should(($el) => {
          expect($el[0].shadowRoot).to.not.be.null
        })
      }
    })
  })
})

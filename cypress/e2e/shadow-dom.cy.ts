describe('Shadow DOM', () => {
  beforeEach(() => {
    cy.visit('/shadowdom')
  })

  it('happy path — page heading is present', () => {
    cy.contains('h3', 'Shadow DOM')
  })

  it('happy path — my-paragraph element exists on the page', () => {
    cy.get('my-paragraph').should('exist')
  })

  it('happy path — shadow root is accessible via .shadow()', () => {
    cy.get('my-paragraph').first().shadow().should('exist')
  })

  it('happy path — shadow content contains expected text', () => {
    cy.get('my-paragraph').first().shadow().find('p')
      .should('contain', "Let's have some different text!")
  })

  it('encapsulation — outer body does not contain shadow text directly', () => {
    cy.get('body').then(($body) => {
      const bodyHtml = $body.html()
      const outerTextOnly = bodyHtml.replace(/<my-paragraph[\s\S]*?<\/my-paragraph>/g, '')
      expect(outerTextOnly).to.not.contain("Let's have some different text!")
    })
  })

  it('happy path — second my-paragraph also has shadow content', () => {
    cy.get('my-paragraph').then(($els) => {
      if ($els.length > 1) {
        cy.get('my-paragraph').eq(1).shadow().find('p').should('exist')
      }
    })
  })
})

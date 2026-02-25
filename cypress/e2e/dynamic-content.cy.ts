describe('Dynamic Content', () => {
  const textCol = '#content .large-2 + .large-10'

  beforeEach(() => {
    cy.visit('/dynamic_content')
  })

  it('happy path — page heading is visible', () => {
    cy.get('h3').should('have.text', 'Dynamic Content')
  })

  it('happy path — 3 content rows are displayed', () => {
    cy.get('#content .large-2 img').should('have.length', 3)
  })

  it('happy path — each row has an image with a non-empty src', () => {
    cy.get('#content .large-2 img').each(($img) => {
      cy.wrap($img).should('have.attr', 'src').and('not.be.empty')
    })
  })

  it('happy path — each row has non-empty text content', () => {
    cy.get(textCol).each(($col) => {
      cy.wrap($col).invoke('text').invoke('trim').should('not.be.empty')
    })
  })

  it('happy path — static content param loads page with same structure', () => {
    cy.visit('/dynamic_content?with_content=static')
    cy.get('#content .large-2 img').should('have.length', 3)
    cy.get(textCol).should('have.length', 3)
  })

  it('edge case — content may change on reload without static param', () => {
    const firstVisitTexts: string[] = []

    cy.get(textCol).each(($col) => {
      firstVisitTexts.push($col.text().trim())
    }).then(() => {
      cy.reload()
      const secondVisitTexts: string[] = []

      cy.get(textCol).each(($col) => {
        secondVisitTexts.push($col.text().trim())
      }).then(() => {
        expect(secondVisitTexts).to.have.length(firstVisitTexts.length)
        secondVisitTexts.forEach((text) => {
          expect(text).to.not.be.empty
        })
      })
    })
  })
})

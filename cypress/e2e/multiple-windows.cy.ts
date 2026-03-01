describe('Multiple Windows', () => {
  beforeEach(() => {
    cy.visit('/windows')
  })

  it('happy path ⋙ page heading is visible', () => {
    cy.get('h3').should('have.text', 'Opening a new window')
  })

  it('happy path ⋙ link text is "Click Here"', () => {
    cy.get('.example a').should('have.text', 'Click Here')
  })

  it('happy path ⋙ "Click Here" link has target _blank', () => {
    cy.get('.example a').should('have.attr', 'target', '_blank')
  })

  it('happy path ⋙ link href points to /windows/new', () => {
    cy.get('.example a').should('have.attr', 'href', '/windows/new')
  })

  it('happy path ⋙ removing target and clicking navigates to /windows/new', () => {
    cy.get('.example a').invoke('removeAttr', 'target').click()
    cy.url().should('include', '/windows/new')
  })

  it('happy path ⋙ new window page has heading "New Window"', () => {
    cy.visit('/windows/new')
    cy.get('h3').should('have.text', 'New Window')
  })

  it('happy path ⋙ stub window.open and verify it was called', () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen')
    })
    cy.get('.example a').then(($a) => {
      $a.attr('onclick', 'window.open(this.href); return false;')
      $a.removeAttr('target')
    })
    cy.get('.example a').click()
    cy.get('@windowOpen').should('have.been.calledOnce')
  })
})

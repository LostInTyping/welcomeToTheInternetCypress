describe('Nested Frames', () => {
  beforeEach(() => {
    cy.visit('/nested_frames')
  })

  it('happy path ⋙ frameset exists on the page', () => {
    cy.get('frameset').should('exist')
  })

  it('happy path ⋙ frame-top and frame-bottom are present', () => {
    cy.get('frame[name="frame-top"]').should('exist')
    cy.get('frame[name="frame-bottom"]').should('exist')
  })

  it('happy path ⋙ bottom frame body contains "BOTTOM"', () => {
    cy.get('frame[name="frame-bottom"]')
      .its('0.contentDocument.body')
      .should('contain.text', 'BOTTOM')
  })

  it('happy path ⋙ top frame contains nested frames LEFT, MIDDLE, RIGHT', () => {
    cy.get('frame[name="frame-top"]')
      .its('0.contentDocument')
      .then((doc) => {
        cy.wrap(doc).find('frame[name="frame-left"]').should('exist')
        cy.wrap(doc).find('frame[name="frame-middle"]').should('exist')
        cy.wrap(doc).find('frame[name="frame-right"]').should('exist')
      })
  })

  it('happy path ⋙ LEFT frame body contains "LEFT"', () => {
    cy.get('frame[name="frame-top"]')
      .its('0.contentDocument')
      .then((doc) => {
        cy.wrap(doc).find('frame[name="frame-left"]')
          .its('0.contentDocument.body')
          .should('contain.text', 'LEFT')
      })
  })

  it('happy path ⋙ MIDDLE frame body contains "MIDDLE"', () => {
    cy.get('frame[name="frame-top"]')
      .its('0.contentDocument')
      .then((doc) => {
        cy.wrap(doc).find('frame[name="frame-middle"]')
          .its('0.contentDocument.body')
          .should('contain.text', 'MIDDLE')
      })
  })

  it('happy path ⋙ RIGHT frame body contains "RIGHT"', () => {
    cy.get('frame[name="frame-top"]')
      .its('0.contentDocument')
      .then((doc) => {
        cy.wrap(doc).find('frame[name="frame-right"]')
          .its('0.contentDocument.body')
          .should('contain.text', 'RIGHT')
      })
  })
})

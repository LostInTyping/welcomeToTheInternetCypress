describe('Geolocation', () => {
  it('happy path ⋙ page heading is present', () => {
    cy.visit('/geolocation')
    cy.contains('h3', 'Geolocation')
  })

  it('happy path ⋙ Where am I? button is visible', () => {
    cy.visit('/geolocation')
    cy.contains('button', 'Where am I?').should('be.visible')
  })

  it('happy path ⋙ clicking button with stubbed position shows coordinates', () => {
    cy.visit('/geolocation', {
      onBeforeLoad(win) {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
          cb({ coords: { latitude: 51.5074, longitude: -0.1278 } })
        })
      },
    })
    cy.contains('button', 'Where am I?').click()
    cy.get('#lat-value').should('not.be.empty')
    cy.get('#long-value').should('not.be.empty')
  })

  it('happy path ⋙ stubbed coordinates appear in the display', () => {
    cy.visit('/geolocation', {
      onBeforeLoad(win) {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
          cb({ coords: { latitude: 51.5074, longitude: -0.1278 } })
        })
      },
    })
    cy.contains('button', 'Where am I?').click()
    cy.get('#lat-value').should('have.text', '51.5074')
    cy.get('#long-value').should('have.text', '-0.1278')
  })

  it('negative ⋙ denying permission does not display coordinates', () => {
    cy.visit('/geolocation', {
      onBeforeLoad(win) {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((_cb, err) => {
          err({ code: 1, message: 'User denied Geolocation' })
        })
      },
    })
    cy.contains('button', 'Where am I?').click()
    cy.get('#lat-value').should('not.exist')
  })
})

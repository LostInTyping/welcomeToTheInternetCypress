describe('JavaScript Alerts', () => {
  beforeEach(() => {
    cy.visit('/javascript_alerts')
  })

  it('happy path — page heading is visible', () => {
    cy.get('h3').should('have.text', 'JavaScript Alerts')
  })

  it('happy path — all 3 alert buttons are visible', () => {
    cy.get('button').filter((_, el) => el.textContent!.startsWith('Click for JS')).should('have.length', 3)
  })

  it('initial state — result is empty before any interaction', () => {
    cy.get('#result').should('have.text', '')
  })

  it('happy path — JS Alert shows correct text and updates result', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.contains('button', 'Click for JS Alert').click().then(() => {
      expect(stub).to.have.been.calledWith('I am a JS Alert')
    })

    cy.get('#result').should('have.text', 'You successfully clicked an alert')
  })

  it('happy path — JS Confirm accepted updates result to Ok', () => {
    cy.on('window:confirm', () => true)

    cy.contains('button', 'Click for JS Confirm').click()
    cy.get('#result').should('have.text', 'You clicked: Ok')
  })

  it('happy path — JS Confirm cancelled updates result to Cancel', () => {
    cy.on('window:confirm', () => false)

    cy.contains('button', 'Click for JS Confirm').click()
    cy.get('#result').should('have.text', 'You clicked: Cancel')
  })

  it('happy path — JS Prompt with input updates result', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Hello Cypress')
    })

    cy.contains('button', 'Click for JS Prompt').click()
    cy.get('#result').should('have.text', 'You entered: Hello Cypress')
  })

  it('happy path — JS Prompt cancelled shows null in result', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(null)
    })

    cy.contains('button', 'Click for JS Prompt').click()
    cy.get('#result').should('have.text', 'You entered: null')
  })
})

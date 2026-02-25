describe('Horizontal Slider', () => {
  beforeEach(() => {
    cy.visit('/horizontal_slider')
  })

  it('happy path — page heading is present', () => {
    cy.contains('h3', 'Horizontal Slider')
  })

  it('happy path — input type is range', () => {
    cy.get('input[type="range"]').should('exist')
  })

  it('initial state — slider starts with value 0', () => {
    cy.get('input[type="range"]').should('have.value', '0')
  })

  it('initial state — range output displays the current value', () => {
    cy.get('#range').should('have.text', '0')
  })

  it('happy path — increasing slider value updates display', () => {
    cy.get('input[type="range"]').then(($input) => {
      $input.val(3)
      $input[0].dispatchEvent(new Event('change', { bubbles: true }))
    })
    cy.get('#range').should('have.text', '3')
  })

  it('happy path — decreasing slider value updates display', () => {
    cy.get('input[type="range"]').then(($input) => {
      $input.val(4)
      $input[0].dispatchEvent(new Event('change', { bubbles: true }))
    })
    cy.get('#range').should('have.text', '4')
    cy.get('input[type="range"]').then(($input) => {
      $input.val(2)
      $input[0].dispatchEvent(new Event('change', { bubbles: true }))
    })
    cy.get('#range').should('have.text', '2')
  })

  it('boundary — value cannot go below 0', () => {
    cy.get('input[type="range"]').type('{leftarrow}{leftarrow}{leftarrow}')
    cy.get('input[type="range"]').invoke('val').then((val) => {
      expect(Number(val)).to.be.at.least(0)
    })
  })

  it('boundary — setting value beyond max is clamped to max', () => {
    cy.get('input[type="range"]').invoke('val', 10).trigger('change')
    cy.get('input[type="range"]').invoke('val').then((val) => {
      expect(Number(val)).to.be.at.most(5)
    })
  })
})

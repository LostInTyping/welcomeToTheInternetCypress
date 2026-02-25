describe('Sortable Data Tables', () => {
  beforeEach(() => {
    cy.visit('/tables')
  })

  it('happy path — page heading is present', () => {
    cy.contains('h3', 'Data Tables')
  })

  it('happy path — both tables are visible', () => {
    cy.get('#table1').should('be.visible')
    cy.get('#table2').should('be.visible')
  })

  it('happy path — table1 has expected column headers', () => {
    const expectedHeaders = ['Last Name', 'First Name', 'Email', 'Due', 'Web Site', 'Action']
    cy.get('#table1 thead th').should('have.length', expectedHeaders.length)
    expectedHeaders.forEach((header, i) => {
      cy.get('#table1 thead th').eq(i).should('have.text', header)
    })
  })

  it('happy path — each table has data rows', () => {
    cy.get('#table1 tbody tr').should('have.length.greaterThan', 0)
    cy.get('#table2 tbody tr').should('have.length.greaterThan', 0)
  })

  it('happy path — table data cells contain non-empty text', () => {
    cy.get('#table1 tbody tr').first().find('td').each(($td) => {
      cy.wrap($td).invoke('text').invoke('trim').should('not.be.empty')
    })
  })

  it('happy path — edit and delete action links exist in each row', () => {
    cy.get('#table1 tbody tr').each(($row) => {
      cy.wrap($row).find('td').last().within(() => {
        cy.contains('a', 'edit').should('exist')
        cy.contains('a', 'delete').should('exist')
      })
    })
  })

  it('happy path — clicking Last Name header sorts ascending', () => {
    cy.get('#table1 thead th').contains('Last Name').click()
    cy.get('#table1 tbody tr td:nth-child(1)').then(($cells) => {
      const values = $cells.toArray().map((el) => el.textContent!.trim())
      const sorted = [...values].sort()
      expect(values).to.deep.equal(sorted)
    })
  })

  it('happy path — double-clicking Last Name header sorts descending', () => {
    cy.get('#table1 thead th').contains('Last Name').click()
    cy.get('#table1 thead th').contains('Last Name').click()
    cy.get('#table1 tbody tr td:nth-child(1)').then(($cells) => {
      const values = $cells.toArray().map((el) => el.textContent!.trim())
      const sorted = [...values].sort().reverse()
      expect(values).to.deep.equal(sorted)
    })
  })

  it('happy path — sorting by Email column changes order', () => {
    cy.get('#table1 tbody tr td:nth-child(3)').then(($cells) => {
      const before = $cells.toArray().map((el) => el.textContent!.trim())

      cy.get('#table1 thead th').contains('Email').click()
      cy.get('#table1 tbody tr td:nth-child(3)').then(($sorted) => {
        const after = $sorted.toArray().map((el) => el.textContent!.trim())
        const sortedAsc = [...after].sort()
        expect(after).to.deep.equal(sortedAsc)
      })
    })
  })

  it('edge case — table2 headers do not have class "header"', () => {
    cy.get('#table2 thead th').each(($th) => {
      cy.wrap($th).should('not.have.class', 'header')
    })
  })
})

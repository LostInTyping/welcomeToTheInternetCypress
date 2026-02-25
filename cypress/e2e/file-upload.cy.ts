describe('File Upload', () => {
  beforeEach(() => {
    cy.visit('/upload')
  })

  it('happy path — page heading is visible', () => {
    cy.get('h3').should('have.text', 'File Uploader')
  })

  it('initial state — file input exists with type="file"', () => {
    cy.get('#file-upload').should('exist').and('have.attr', 'type', 'file')
  })

  it('initial state — drag-drop upload area exists', () => {
    cy.get('#drag-drop-upload').should('exist')
  })

  it('happy path — upload file, submit, and verify success message and filename', () => {
    const fileName = 'test-upload.txt'
    const fileContent = 'hello world'

    cy.get('#file-upload').selectFile({
      contents: Cypress.Buffer.from(fileContent),
      fileName,
      mimeType: 'text/plain',
    })
    cy.get('#file-submit').click()
    cy.get('h3').should('have.text', 'File Uploaded!')
    cy.get('#uploaded-files').should('contain.text', fileName)
  })

  it('happy path — uploaded filename matches the selected file', () => {
    const fileName = 'sample-data.txt'

    cy.get('#file-upload').selectFile({
      contents: Cypress.Buffer.from('sample data'),
      fileName,
      mimeType: 'text/plain',
    })
    cy.get('#file-submit').click()
    cy.get('#uploaded-files').should('contain.text', fileName)
  })

  it('negative — submitting without a file does not show success message', () => {
    cy.get('#file-submit').click()
    cy.get('h3').should('not.have.text', 'File Uploaded!')
  })
})

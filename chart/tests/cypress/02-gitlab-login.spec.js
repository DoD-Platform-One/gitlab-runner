describe('Gitlab Login', () => {
  it('Check admin is able to login', () => {
    // Login as root user
    cy.visit('/users/sign_in')
    cy.get('input[id="user_login"]').type('root')
    cy.get('input[id="user_password"]').type(Cypress.env('adminpassword'))
    cy.get('input[type="submit"]').click()
  })
})

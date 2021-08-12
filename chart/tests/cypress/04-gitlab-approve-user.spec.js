Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  // gitlab throws this error in the console which by default fails the cypress test
  return false
})

describe('Approve New User', () => {
  it('Admin Tasks', () => {    
    // Admin Login
    cy.visit('/users/sign_in')
    cy.get('input[id="user_login"]').type('root')
    cy.get('input[id="user_password"]').type(Cypress.env('adminpassword'))
    cy.get('input[type="submit"]').click()

    // Admin Approve New User
    cy.visit('/admin/users')
    cy.get('a[data-qa-selector="pending_approval_tab"]').click()
    cy.get('div.table-action-buttons button').click()
    cy.get('ul.dropdown-menu.dropdown-menu-right.show').contains('Approve').click()
  })
})

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  if (err.message.includes('Cannot read properties of null')) {
    return false
  }  
})

describe('Gitlab Login', () => {
  it('Check admin is able to login', () => {
    // test login
    cy.visit('/users/sign_in')
    cy.get('input[id="user_login"]').type('root')
    cy.get('input[id="user_password"]').type(Cypress.env('adminpassword'))
    cy.get('button[data-qa-selector="sign_in_button"').click()

    // approve new user
    cy.visit('/admin/users')
    cy.get('a[data-testid="pending-approval-tab"]').click()

    cy.get('body').then($body => {
      if ($body.find('div[data-testid="user-actions-dropdown-toggle"] > button').length > 0 ) {
        cy.get('div[data-testid="user-actions-dropdown-toggle"] > button').click()
        cy.get('li[data-testid="approve"] > button').click()
        cy.get('button[data-testid="approve-user-confirm-button"]').click()
      }
    })
  })
})
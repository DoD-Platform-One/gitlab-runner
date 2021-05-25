Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    // gitlab throws this error in the console which by default fails the cypress test
    return false
  })
  
  describe('Create New User', () => {
    it('Create user', () => {   
      // Create new User
      cy.visit('/users/sign_up')
      cy.get('input[id="new_user_first_name"]').type('gitlab')
      cy.get('input[id="new_user_last_name"]').type('test')
      cy.get('input[id="new_user_username"]').type(Cypress.env('gitlab_user'))
      cy.get('input[id="new_user_email"]').type(Cypress.env('gitlab_email'))
      cy.wait(3000) // wait 3 seconds for username check to complete
      cy.get('input[id="new_user_password"]').type(Cypress.env('gitlab_password'))
      cy.get('input[type="submit"]').click()
    })
  })
  
  
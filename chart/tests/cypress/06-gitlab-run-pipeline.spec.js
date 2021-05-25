Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  // gitlab throws this error in the console which by default fails the cypress test
  return false
})

describe('Run Pipeline', () => {
  it('Login as new user', () => {
    // Login as regular user to continue on with testing
    cy.visit('/users/sign_in')
    cy.get('input[id="user_login"]').type(Cypress.env('gitlab_user'))
    cy.get('input[id="user_password"]').type(Cypress.env('gitlab_password'))
    cy.get('input[type="submit"]').click()

    // Navigate to git repo
    cy.get('div').contains(Cypress.env('gitlab_project')).click()

    // Run Pipeline for Test Project
    cy.get('a[data-qa-selector="ci_cd_link"]').click()
    cy.get('a[data-qa-selector="run_pipeline_button"]').click()
    cy.wait(3000)
    cy.get('button[data-qa-selector="run_pipeline_button"]').click()
    // Wait for pipeline to run
    cy.wait(35000)
    cy.get('header[data-qa-selector="pipeline_header"]').contains('passed')
  })
})

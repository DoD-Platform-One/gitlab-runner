Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  // gitlab throws this error in the console which by default fails the cypress test
  return false
})

describe('Create Project, Disable Auto DevOps', () => {
  it('Create Project', () => {
    // Login as regular user
    cy.visit('/users/sign_in')
    cy.get('input[id="user_login"]').type(Cypress.env('gitlab_user'))
    cy.get('input[id="user_password"]').type(Cypress.env('gitlab_password'))
    cy.get('input[type="submit"]').click()
    cy.get('button[type="submit"]').click()    
    
    // Create project from sample template
    cy.get('a[id="js-onboarding-new-project-link"]').click()    
    cy.get('a.qa-global-new-project-link').click()
    cy.get('a[href="#create_from_template"]').click()
    cy.get('label[for="plainhtml"]').click()
    cy.get('input[id="project_name"]').first().type(Cypress.env('gitlab_project'))
    cy.get('input[id="project_visibility_level_20"]').first().click()
    cy.get('input[type="submit"]').first().click()
    cy.wait(2000) // wait 20 seconds for import to complete

    // Disable Auto DevOps
    cy.visit('/gitlab_user/hello-world/-/settings/ci_cd')
    cy.get('input[id="project_auto_devops_attributes_enabled"]').uncheck()
    cy.get('input[data-qa-selector="save_changes_button"]').click()
  })
})


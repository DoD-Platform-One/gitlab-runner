Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  // gitlab throws this error in the console which by default fails the cypress test
  return false
})

describe('Run Pipeline', () => {
  it('Login as the non-admin user', () => {
    // Login as regular user to continue on with testing
    cy.visit('/users/sign_in')
    cy.get('input[id="user_login"]').type(Cypress.env('gitlab_username'))
    cy.get('input[id="user_password"]').type(Cypress.env('gitlab_password'))
    cy.get('button[type="submit"][name="button"]').click()

    // Disable Auto DevOps
    cy.visit('/'+Cypress.env('gitlab_username')+'/'+Cypress.env('gitlab_project')+'/-/settings/ci_cd#autodevops-settings')
    cy.get('input[id="project_auto_devops_attributes_enabled"]').uncheck({force: true})
    cy.get('input[data-qa-selector="save_changes_button"]').click()

    // conditionally configure ci pipeline
    cy.visit('/'+Cypress.env('gitlab_username')+'/'+Cypress.env('gitlab_project'))
    cy.get('body').then($body => {
      if ($body.find('table[data-qa-selector="file_tree_table"]').length > 0) {
        // pipeline already configured. delete the existing pipeline
        cy.visit('/'+Cypress.env('gitlab_username')+'/'+Cypress.env('gitlab_project')+'/-/pipelines')
        cy.get('a[id="js-code-quality-walkthrough"]').click()
        cy.get('button[data-qa-selector="job_action_button"]').should('have.class', 'retry').click()
      }
      else {
        // configure new pipeline
        cy.visit('/'+Cypress.env('gitlab_username')+'/'+Cypress.env('gitlab_project')+'/-/new/main/')
        cy.get('input[id="file_name"]').click().type('.gitlab-ci.yml')
        cy.get('div[class="view-line"]').eq(0).click().type('stages:{enter}')
        cy.get('div[class="view-line"]').eq(1).click().type('- test{enter}')
        cy.get('div[class="view-line"]').eq(2).click().type('{backspace}pipeline-test:{enter}')
        cy.get('div[class="view-line"]').eq(3).click().type('stage: test{enter}')
        cy.get('div[class="view-line"]').eq(4).click().type('script:{enter}')
        cy.get('div[class="view-line"]').eq(5).click().type('- echo The pipeline test is successful!{enter}')
        // commit file and start pipeline
        cy.get('button[id="commit-changes"]').click()
      }
    })
    // wait 9 seconds for pipeline to get started
    cy.wait(9000)
    // Go to pipelines page
    cy.visit('/'+Cypress.env('gitlab_username')+'/'+Cypress.env('gitlab_project')+'/-/pipelines')
    // Wait for pipeline to run and pass. Timeout after 120 seconds
    cy.get('a[data-qa-selector="pipeline_commit_status"]',{timeout: 120000}).should('contain','passed')
    // wait 2 seconds so that the result can be seen in video
    cy.wait(2000)
  })
})

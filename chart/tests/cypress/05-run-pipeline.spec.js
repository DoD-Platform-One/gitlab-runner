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
    cy.get('input[type="submit"]').click()

    // Disable Auto DevOps
    cy.visit('/'+Cypress.env('gitlab_username')+'/'+Cypress.env('gitlab_project')+'/-/settings/ci_cd')
    cy.get('input[id="project_auto_devops_attributes_enabled"]').uncheck()
    cy.get('input[data-qa-selector="save_changes_button"]').click()

    // configure ci pipeline
    cy.visit('/'+Cypress.env('gitlab_username')+'/'+Cypress.env('gitlab_project')+'/-/new/main/')
    cy.get('input[id="file_name"]').click().type('.gitlab-ci.yml')
    cy.get('div[class="view-line"]').eq(0).click().type('stages:{enter}')
    cy.get('div[class="view-line"]').eq(1).click().type('- test{enter}')
    cy.get('div[class="view-line"]').eq(2).click().type('{backspace}dogfood:{enter}')
    cy.get('div[class="view-line"]').eq(3).click().type('stage: test{enter}')
    cy.get('div[class="view-line"]').eq(4).click().type('script:{enter}')
    cy.get('div[class="view-line"]').eq(5).click().type('- echo testing >> file.txt{enter}')
    cy.get('div[class="view-line"]').eq(6).click().type('{backspace}artifacts:{enter}')
    cy.get('div[class="view-line"]').eq(7).click().type('paths:{enter}')
    cy.get('div[class="view-line"]').eq(8).click().type('- file.txt{enter}')
    // commit file and start pipeline
    cy.get('button[id="commit-changes"]').click()

    // wait 9 seconds for pipeline to get started
    cy.wait(9000)

    // Go to pipelines page
    cy.visit('/'+Cypress.env('gitlab_username')+'/'+Cypress.env('gitlab_project')+'/-/pipelines')
    // Wait 120 seconds for pipeline to run and pass
    cy.wait(120000)
    cy.get('a[id="js-code-quality-walkthrough"]').first().contains('passed')
  })
})

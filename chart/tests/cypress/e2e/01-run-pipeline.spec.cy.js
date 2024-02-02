Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  // gitlab throws this error in the console which by default fails the cypress test
  return false
})

describe('Gitlab Runner: Run Pipeline', () => {
  it('Execute project CI/CD pipeline as root user', () => {
    // test login
    cy.visit(`${Cypress.env('url')}/users/sign_in`)
    cy.performGitlabLogin('root', Cypress.env('adminpassword'))

    cy.createGitlabProject(Cypress.env('url'), Cypress.env('gitlab_project'))

    // Disable Auto DevOps
    cy.visit(`${Cypress.env('url')}/root/${Cypress.env('gitlab_project')}/-/settings/ci_cd#autodevops-settings`)
    cy.get('input[id="project_auto_devops_attributes_enabled"]').uncheck({force: true})
    cy.get('button[data-testid="save-changes-button"]').click()

    // conditionally configure ci pipeline
    cy.visit(`${Cypress.env('url')}/root/${Cypress.env('gitlab_project')}`)
    cy.get('body').then($body => {
      // configure new pipeline
      cy.visit(`${Cypress.env('url')}/root/${Cypress.env('gitlab_project')}/-/new/main/`)
      cy.get('input[id="file_name"]').click().type('.gitlab-ci.yml')
      cy.get('div[class="view-line"]').click().type('pipeline-test:{enter}{backspace}  stage: test{enter}{backspace}  script:{enter}{backspace}{backspace}    - echo The pipeline test is successful!{enter}')
      // commit file and start pipeline
      cy.scrollTo('bottom')
      cy.get('button[id="commit-changes"]').click()
    })
    // Go to pipelines page
    cy.visit(`${Cypress.env('url')}/root/${Cypress.env('gitlab_project')}/-/pipelines`)
    // Wait for pipeline to finish
    cy.get('span[data-testid=ci-icon-text]',{timeout: 120000}).should('contain','Passed')
    // wait 2 seconds so that the result can be seen in video
    cy.wait(2000)
    //Remove created project
    cy.deleteGitlabProject(Cypress.env('url'), 'root', Cypress.env('gitlab_project'))
  })
})

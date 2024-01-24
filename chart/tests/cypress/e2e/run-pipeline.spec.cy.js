Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  // gitlab throws this error in the console which by default fails the cypress test
  return false
})

describe('Gitlab Runner: Run Pipeline', () => {
  it('Execute project CI/CD pipeline as root user', () => {
    // test login
    cy.visit('/users/sign_in')
    cy.get('input[id="user_login"]').type('root')
    cy.get('input[id="user_password"]').type(Cypress.env('adminpassword'))
    cy.get('button[data-testid="sign-in-button"').click()

    // check if project exists
    cy.get('body').then($body => {
      if ($body.find('.project-row').length === 0) {
            // create a repo based with a container registry
            cy.visit('/projects/new')
            cy.get('a[href="#blank_project"]').click()
            cy.get('input[id="project_name"]').first().type(Cypress.env('gitlab_project')) // for some reason, there are 2 other hidden elements with the same attributes but we only need the first one
            // Also use force: true for the click due to the label is covering the radio button (but can still be clicked)
            cy.get('button[type="button"]').contains('Pick a group or namespace').click()
            // Wait for dropdown to populate
            cy.wait(3000)
            cy.get('li[tabindex=-1]').click()
            // cy.get('li[data-testid="listbox-item-gid://gitlab/Namespaces::UserNamespace/1"]').click()
            cy.get('input[id="project_visibility_level_20"]').first().click({force: true})
            //commenting out below because 'initial_with_readme' is checked by default now
            //cy.get('input[id="project_initialize_with_readme"]').click({force: true)
            cy.get('button[type="submit"]').first().click()                        // for some reason, there are 2 other hidden elements with the same attributes but we only need the first one
      }
    })

    // Disable Auto DevOps
    cy.visit('/root/'+Cypress.env('gitlab_project')+'/-/settings/ci_cd#autodevops-settings')
    cy.get('input[id="project_auto_devops_attributes_enabled"]').uncheck({force: true})
    cy.get('button[data-testid="save-changes-button"]').click()

    // conditionally configure ci pipeline
    cy.visit('/root/'+Cypress.env('gitlab_project'))
    cy.get('body').then($body => {
      // configure new pipeline
      cy.visit('/root/'+Cypress.env('gitlab_project')+'/-/new/main/')
      cy.get('input[id="file_name"]').click().type('.gitlab-ci.yml')
      cy.get('div[class="view-line"]').click().type('pipeline-test:{enter}{backspace}  stage: test{enter}{backspace}  script:{enter}{backspace}{backspace}    - echo The pipeline test is successful!{enter}')
      // commit file and start pipeline
      cy.scrollTo('bottom')
      cy.get('button[id="commit-changes"]').click()
    })
    // Go to pipelines page
    cy.visit('/root/'+Cypress.env('gitlab_project')+'/-/pipelines')
    // Wait for pipeline to finish
    cy.get('span[data-testid=ci-icon-text]',{timeout: 120000}).should('contain','Passed')
    // wait 2 seconds so that the result can be seen in video
    cy.wait(2000)
  })
})

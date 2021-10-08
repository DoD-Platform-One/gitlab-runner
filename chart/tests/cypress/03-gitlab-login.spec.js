describe('Gitlab Login', () => {
  it('Check admin is able to login', () => {
    // test login
    cy.visit('/users/sign_in')
    cy.get('input[id="user_login"]').type('root')
    cy.get('input[id="user_password"]').type(Cypress.env('adminpassword'))
    cy.get('input[type="submit"]').click()

    // approve new user
    cy.visit('/admin/users')
    cy.get('a[data-qa-selector="pending_approval_tab"]').click()

    // version 13.12.9 and 14.0.5
    cy.get('button[id="__BVID__30__BV_toggle_"]').click()
    cy.get('a[href="/admin/users/'+Cypress.env('gitlab_username')+'/approve"]').click()

    // version 14.1.x 14.2.x
    // cy.get('button[id="__BVID__32__BV_toggle_"]').click()
    // cy.get('button[data-path="/admin/users/'+Cypress.env('gitlab_username')+'/approve"]').click()
    // cy.get('button[data-qa-selector="approve_user_confirm_button"]').click()

  })
})
describe('@momentum-ui/react-collaboration', () => {
  it('snapshot of social-list', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/social-list`)
      .get(`.social-list`)
      .should('be.visible')
      .percySnapshot();
  });
});

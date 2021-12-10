describe('@momentum-ui/react-collaboration', () => {
  it('snapshot of form-sub-section', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/form-sub-section`)
      .get(`.sub-section`)
      .should('be.visible')
      .percySnapshot();
  });
});

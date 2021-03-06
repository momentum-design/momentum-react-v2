import { prefix } from '../../utils/index';

describe('@momentum-ui/react-collaboration', () => {
  it('snapshot of label', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/label`)
      .get(`.${prefix}-label`)
      .should('be.visible')
      .percySnapshot();
  });
});

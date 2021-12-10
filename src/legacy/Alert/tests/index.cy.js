import { prefix } from '../../utils/index';

describe('@momentum-ui/react-collaboration', () => {
  it('snapshot of alert', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/alert`)
      .get(`.${prefix}-alert`)
      .should('be.visible')
      .percySnapshot();
  });
});

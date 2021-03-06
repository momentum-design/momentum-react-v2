import { prefix } from '../../utils/index';

describe('@momentum-ui/react-collaboration', () => {
  it('snapshot of sidebar', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/sidebar`)
      .get(`.${prefix}-sidebar`)
      .should('be.visible')
      .percySnapshot();
  });
});

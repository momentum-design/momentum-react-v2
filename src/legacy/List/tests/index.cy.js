import { prefix } from '../../utils/index';

describe('@momentum-ui/react-collaboration', () => {
  it('snapshot of list', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/list`)
      .get(`.${prefix}-list`)
      .should('be.visible')
      .percySnapshot();
  });
});

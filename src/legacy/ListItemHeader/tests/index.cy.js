import { prefix } from '../../utils/index';

describe('@momentum-ui/react-collaboration', () => {
  it('snapshot of list-item-header', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/list-item-header`)
      .get(`.${prefix}-list-item-header`)
      .should('be.visible')
      .percySnapshot();
  });
});

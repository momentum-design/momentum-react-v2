import { prefix } from '../../utils/index';

describe('@momentum-ui/react-collaboration', () => {
  it('snapshot of icon', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/icon`)
      .get(`.${prefix}-icon`)
      .should('be.visible')
      .percySnapshot();
  });
});

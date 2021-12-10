import { prefix } from '../../utils/index';

describe('@momentum-ui/react-collaboration', () => {
  it('snapshot of accordion', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/accordion`)
      .get(`.${prefix}-accordion`)
      .should('be.visible')
      .percySnapshot();
  });
});

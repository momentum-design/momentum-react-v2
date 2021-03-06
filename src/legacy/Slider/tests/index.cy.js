import { prefix } from '../../utils/index';

describe('@momentum-ui/react-collaboration', () => {
  it('snapshot of slider', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/slider`)
      .get(`.${prefix}-slider`)
      .should('be.visible')
      .percySnapshot();
  });
});

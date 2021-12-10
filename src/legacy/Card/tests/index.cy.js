import { prefix } from '../../utils/index';

describe('@momentum-ui/react-collaboration', () => {
  it('snapshot of card', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/card`)
      .get(`.${prefix}-card`)
      .should('be.visible')
      .percySnapshot();
  });
});

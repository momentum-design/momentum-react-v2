import { prefix } from '../../utils/index';

describe('@momentum-ui/react-collaboration', () => {
  it('snapshot of lightbox', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/lightbox`)
      .get(`.${prefix}-lightbox`)
      .should('be.visible')
      .percySnapshot();
  });
});

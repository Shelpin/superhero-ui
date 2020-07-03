// about cypress and iframes https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
const getIframeDocument = () => cy
  .get('#jitsiConferenceFrame0')
  .its('0.contentDocument')
  .should('exist');

const getIframeBody = () => getIframeDocument()
  .its('body').should('not.be.undefined')
  .then(cy.wrap);

describe('Conference.vue', () => {
  before(() => {
    cy.visit('/league');
  });

  it('change route by click to the iframe "OK" button', () => {
    const ROOM = 'SOME_ROOM_NAME';

    getIframeBody().find('#enter_room_field').type(ROOM);

    getIframeBody().find('#enter_room_button').click();
    cy.location('pathname').should('eq', `/league/${ROOM}`);
  });
});
describe('Repo page', () => {
  beforeEach(() => {
    cy.visit('/view/kyleoliveiro/scarab-core');
    cy.get('[data-cy=back-btn]').as('backBtn');
    cy.get('[data-cy=readme-viewer]').as('readmeViewer');
  });

  it('renders', () => {
    cy.get('[data-cy=app]').should('exist');
  });

  describe('Back button', () => {
    it('goes to user page', () => {
      cy.get('@backBtn').click();
      cy.location('pathname').should('eq', '/view/kyleoliveiro');
    });
  });

  describe('Readme viewer', () => {
    it('should show project readme', () => {
      cy.get('@readmeViewer').should('contain', 'Scarab Core');
    });
  });
});

describe('Invalid repo page', () => {
  beforeEach(() => {
    cy.visit('/view/some invalid user/some invalid repo');
    cy.get('[data-cy=invalid-repo-message]').as('invalidRepoMessage');
  });

  it('shows invalid repo message', () => {
    cy.get('@invalidRepoMessage').should('exist');
  });
});

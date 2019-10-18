describe('User page', () => {
  beforeEach(() => {
    cy.visit('/view/kyleoliveiro');
    cy.get('[data-cy=back-btn]').as('backBtn');
    cy.get('[data-cy=repo-list]').as('repoList');
    cy.get('[data-cy=repo-list-item]').as('repoListItems');
  });

  it('renders', () => {
    cy.get('[data-cy=app]').should('exist');
  });

  describe('Back button', () => {
    it('goes to home page', () => {
      cy.get('@backBtn').click();
      cy.location('pathname').should('eq', '/');
    });
  });

  describe('Repo list', () => {
    it('shows user‘s repos', () => {
      cy.get('@repoList').should('exist');
      cy.get('@repoListItems').should('exist');
    });
  });
});

describe('Invalid user page', () => {
  beforeEach(() => {
    cy.visit('/view/some invalid user');
    cy.get('[data-cy=invalid-user-message]').as('invalidUserMessage');
  });

  it('shows invalid user message', () => {
    cy.get('@invalidUserMessage').should('exist');
  });
});

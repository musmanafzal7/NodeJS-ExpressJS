import "cypress-localstorage-commands";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (loginObject) => { 
    cy.request({
      method: 'POST',
      url: '/api/v1/auth/login',
      body: loginObject
    })
    .its('body')
    .then(body => {
        expect(body.token).to.be.a('string')
        cy.setLocalStorage("jwt", body.token);
    })
});

Cypress.Commands.add('signup', (signupObject) => { 
    cy.request({
      method: 'POST',
      url: '/api/v1/auth/signup',
      body: signupObject
    })
    .its('body')
    .then(body => {
        expect(body.token).to.be.a('string')
        cy.setLocalStorage("jwt", body.token);
    })
});
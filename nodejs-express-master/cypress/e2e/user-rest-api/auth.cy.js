/// <reference types="cypress" />

const { token } = require('morgan');
const { user } = require('../../fixtures/userFixture');
const userLogin = {
    email: user.email,
    password: user.password
}
describe('auth rest-api testing', () => { 
    context('CRUD', () => {
        it('create new user', () => {
            cy.request({
                method: 'POST',
                url: '/api/v1/auth/signup',
                followRedirect: false, 
                body: user
            }).then( (response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('login user', () => {
            cy.request({
                method: 'POST',
                url: '/api/v1/auth/login',
                followRedirect: false, 
                body: userLogin
            }).then( (response) => {
                expect(response.status).to.eq(200)
            })
        })
    })
})
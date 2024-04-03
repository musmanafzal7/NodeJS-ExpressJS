/// <reference types="cypress" />

const { user } = require('../../fixtures/userFixture');
const { faker } = require('@faker-js/faker');
const userLogin = {
    email: user.email,
    password: user.password
}
describe('user rest-api testing', () => { 
    context('CRUD', () => {
        before(() => {
            cy.signup(user);
            cy.clearLocalStorageSnapshot();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
            cy.login(userLogin);
        });
        
        afterEach(() => {
            cy.saveLocalStorage();
        });
        
        it('get all users', () => {
            cy.getLocalStorage("jwt").then((token) =>{
                expect(token).to.not.eq(null)
                const authorization = `${ token }`;
                cy.request({
                    method: 'GET',
                    url: '/api/v1/users',
                    auth: {
                        'bearer': authorization
                    }
                }).then( (response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.users.length).to.be.greaterThan(0)
                })
            });
        })

        it('get user by id', () => {
            cy.getLocalStorage('jwt').then( (token) => {
                const authorization = `${ token }`;
                cy.request({
                    method: 'GET',
                    url: '/api/v1/users',
                    auth: {
                        'bearer': authorization
                    }
                }).then( (response) => {
                    if(response.status === 200){
                        if(response.body.users.length > 1){
                            const user = response.body.users[1];
                            cy.request({
                                method: 'GET',
                                url: `/api/v1/users/${user.id}`,
                                auth: {
                                    'bearer': authorization
                                }
                            }).then( (response) => {
                                expect(response.status).to.eq(200)
                            })
                        }
                    }
                })
            });
        })

        it('update user', () => {
            const updateUser = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                address: faker.address.streetAddress()
            }
            cy.getLocalStorage('jwt').then( (token) => {  
                const authorization = `${ token }`;
                cy.request({
                    method: 'GET',
                    url: '/api/v1/users',
                    auth: {
                        'bearer': authorization
                    }
                }).then( (response) => {
                    if(response.status === 200){
                        if(response.body.users.length > 1){ 
                            const user = response.body.users[1];
                            cy.request({
                                method: 'PUT',
                                url: `/api/v1/users/${user.id}`,
                                body: updateUser,
                                auth: {
                                    'bearer': authorization
                                }
                            }).then( (response) => {
                                expect(response.status).to.eq(200)
                                expect(response.body.user.email).to.eq(updateUser.email)
                            })
                        }
                    }
                })
            });
        })

        it('delete user by id', () => {
            cy.getLocalStorage('jwt').then( (token) => {
                const authorization = `${ token }`;
                cy.request({
                    method: 'GET',
                    url: '/api/v1/users',
                    auth: {
                        'bearer': authorization
                    }
                }).then( (response) => {
                    if(response.status === 200){
                        if(response.body.users.length > 1){
                            const user = response.body.users[1];
                            cy.request({
                                method: 'DELETE',
                                url: `/api/v1/users/${user.id}`,
                                auth: {
                                    'bearer': authorization
                                }
                            }).then( (response) => {
                                expect(response.status).to.eq(200)
                            })
                        } 
                    }
                })
            });
        })
    })

})
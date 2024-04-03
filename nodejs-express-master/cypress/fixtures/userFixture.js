const { faker } = require('@faker-js/faker');

const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.random.alphaNumeric(8) ,
    address: faker.address.streetAddress(),
    contact: faker.phone.number(),
    email: faker.internet.email(),
    dob: faker.date.birthdate(),
}



module.exports = {
    user
}
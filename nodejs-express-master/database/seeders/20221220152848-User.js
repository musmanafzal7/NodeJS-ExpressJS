'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');
require('dotenv').config()
const saltGenerated = bcrypt.genSaltSync(10, 'a');
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', 
    [
      {
      firstName: 'Super',
      lastName: 'Admin',
      email: 'superadmin@admin.com',
      contact: '03002082558',
      streetAddress: 'Pakistan',
      city: 'Lahore',
      gender: 'Male',
      dob: '11-03-1998',
      active: true,
      salt: saltGenerated,
      password: bcrypt.hashSync('Admin123', saltGenerated),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Test',
      lastName: 'Account',
      email: 'test@account.com',
      contact: '03001234567',
      streetAddress: 'Pakistan',
      city: 'Lahore',
      gender: 'Male',
      dob: '11-11-1996',
      active: false,
      salt: saltGenerated,
      password: bcrypt.hashSync('Admin123', saltGenerated),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

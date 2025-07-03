'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        id: 11,
        role_id: 3,
        username: 'renggaasmara',
        password: 'password12334',
        email: 'lecturer@gmail.com',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        role_id: 3,
        username: 'irmawulandari',
        password: 'password12334',
        email: 'lecturer2@gmail.com',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        role_id: 3,
        username: 'heroyudomartono',
        password: 'password12334',
        email: 'lecturer3@gmail.com',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        role_id: 3,
        username: 'wenymistarika',
        password: 'password12334',
        email: 'lecturer4@gmail.com',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        role_id: 3,
        username: 'iraprasetyaningrum',
        password: 'password12334',
        email: 'lecturer5@gmail.com',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    // return queryInterface.bulkDelete('users', null, {});
  }
};

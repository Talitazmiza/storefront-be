'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('technology', [
      {
        id: 1,
        cluster_id: 1,
        name: 'VueJs',
        code: 'F01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        cluster_id: 2,
        name: 'ExpressJs',
        code: 'B01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        cluster_id: 2,
        name: 'NodeJs',
        code: 'B02',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        cluster_id: 1,
        name: 'ReactJs',
        code: 'F02',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        cluster_id: 1,
        name: 'NextJs',
        code: 'F03',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

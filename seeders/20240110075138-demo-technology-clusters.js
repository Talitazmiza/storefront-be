'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // return queryInterface.bulkInsert('technology_clusters', [
    //   {
    //     id: 1,
    //     name: 'frontend',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     id: 2,
    //     name: 'backend',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     id: 3,
    //     name: 'database',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    // ])
  },

  async down (queryInterface, Sequelize) {
    // return queryInterface.bulkDelete('technology_clusters', null, {});
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('students', [
      {
        id: 2,
        user_id: 11,
        fullName: 'yahyaaaaa',
        nrp: '1234567',
        bio: 'fearnot',
        gender: 'male',
        photo: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        user_id: 12,
        fullName: 'yoyokkkkk',
        nrp: '2134576',
        bio: 'no bio yet hehe',
        gender: 'male',
        photo: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        user_id: 13,
        fullName: 'rahsyakbar syahab',
        nrp: '1334589',
        bio: 'pretending',
        gender: 'male',
        photo: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        user_id: 14,
        fullName: 'sutiman',
        nrp: '4334572',
        bio: 'oklahoma in my blood',
        gender: 'male',
        photo: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        user_id: 15,
        fullName: 'kiki manjiman',
        nrp: '1434672',
        bio: 'just be me',
        gender: 'male',
        photo: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    // return queryInterface.bulkDelete('students', null, {});
  }
};

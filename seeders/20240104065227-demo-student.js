'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // return queryInterface.bulkInsert('students', [
    //   {
    //     id: 2,
    //     user_id: 3,
    //     fullName: 'yahyaaaaa',
    //     nrp: '1234567',
    //     bio: 'fearnot',
    //     gender: 'male',
    //     photo: '',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     id: 3,
    //     user_id: 4,
    //     fullName: 'yoyokkkkk',
    //     nrp: '2134576',
    //     bio: 'no bio yet hehe',
    //     gender: 'male',
    //     photo: '',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     id: 4,
    //     user_id: 5,
    //     fullName: 'rahsyakbar syahab',
    //     nrp: '1334589',
    //     bio: 'pretending',
    //     gender: 'male',
    //     photo: '',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     id: 5,
    //     user_id: 6,
    //     fullName: 'sutiman',
    //     nrp: '4334572',
    //     bio: 'oklahoma in my blood',
    //     gender: 'male',
    //     photo: '',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     id: 6,
    //     user_id: 7,
    //     fullName: 'kiki manjiman',
    //     nrp: '1434672',
    //     bio: 'just be me',
    //     gender: 'male',
    //     photo: '',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     id: 7,
    //     user_id: 8,
    //     fullName: 'olivia ratukita semua',
    //     nrp: '1435672',
    //     bio: 'call me tuan puteri',
    //     gender: 'female',
    //     photo: '',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     id: 8,
    //     user_id: 9,
    //     fullName: 'juveno liana',
    //     nrp: '1432672',
    //     bio: 'aku cewe bukan cowo',
    //     gender: 'female',
    //     photo: '',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     id: 9,
    //     user_id: 10,
    //     fullName: 'dani darman tiyo',
    //     nrp: '1412672',
    //     bio: 'panggil aja dani bukan danny',
    //     gender: 'male',
    //     photo: '',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    // ])
  },

  async down (queryInterface, Sequelize) {
    // return queryInterface.bulkDelete('students', null, {});
  }
};

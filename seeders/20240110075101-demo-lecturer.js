'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('lecturers', [
      {
        id: 1,
        user_id: 11,
        name: 'Rengga Asmara, S.Kom, M.T',
        nip: '198105082005011002',
        gender: 'male',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        user_id: 12,
        name: 'Irma Wulandari, S.Si, M.Sc',
        nip: '198010032015042001',
        gender: 'female',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        user_id: 13,
        name: 'Hero Yudo Martono, ST, MT',
        nip: '197811032005011002',
        gender: 'male',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        user_id: 14,
        name: 'Weny Mistarika Rahmawati, S.Kom, M.Kom, M.Sc.',
        nip: '199104032022032008',
        gender: 'female',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        user_id: 15,
        name: 'Ira Prasetyaningrum, S.Si., M.T.',
        nip: '198005292008122005',
        gender: 'female',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    // return queryInterface.bulkDelete('lecturers', null, {});
  }
};

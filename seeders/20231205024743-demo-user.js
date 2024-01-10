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
        email: 'lecturer@gmail.com',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        role_id: 3,
        username: 'heroyudomartono',
        password: 'password12334',
        email: 'lecturer@gmail.com',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        role_id: 3,
        username: 'wenymistarika',
        password: 'password12334',
        email: 'lecturer@gmail.com',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        role_id: 3,
        username: 'iraprasetyaningrum',
        password: 'password12334',
        email: 'lecturer@gmail.com',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    //   {
    //     id: 2,
    //     role_id: 2,
    //     username: 'meenamasaud',
    //     password: 'meenamass777',
    //     email: 'meenasmasaud@gmail.com',
    //     status: false,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    // {
    //   id: 3,
    //   role_id: 2,
    //   username: 'yahyaaja',
    //   password: 'sayayahya',
    //   email: 'yahyak1233@gmail.com',
    //   status: true,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },
    //   {
    //     id: 4,
    //     role_id: 2,
    //     username: 'yoyokaja',
    //     password: 'yoyokyolo',
    //     email: 'yoyoklife@gmail.com',
    //     status: true,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     id: 5,
    //     role_id: 2,
    //     username: 'rahsyahab',
    //     password: 'rasyahab1298',
    //     email: 'syahabrah@gmail.com',
    //     status: false,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     id: 6,
    //     role_id: 2,
    //     username: 'sutiman',
    //     password: '121331suti',
    //     email: 'sutiparman@gmail.com',
    //     status: false,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     id: 7,
    //     role_id: 2,
    //     username: 'kikiman',
    //     password: 'yuteruuu1',
    //     email: 'kikisuperman@gmail.com',
    //     status: false,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     id: 8,
    //     role_id: 2,
    //     username: 'olivia',
    //     password: 'oliviasejuta',
    //     email: 'olipiak@gmail.com',
    //     status: true,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     id: 9,
    //     role_id: 2,
    //     username: 'juveno',
    //     password: 'juveee_12',
    //     email: 'juveno@gmail.com',
    //     status: true,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     id: 10,
    //     role_id: 2,
    //     username: 'dannydraco',
    //     password: 'dans?90',
    //     email: 'dannyydra@gmail.com',
    //     status: false,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    ]);
  },

  async down (queryInterface, Sequelize) {
    // return queryInterface.bulkDelete('users', null, {});
  }
};

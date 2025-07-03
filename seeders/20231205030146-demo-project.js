'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('projects', [{
      id: 1,
      user_id: 11,
      title: 'NekopoiApp',
      abstract: 'Nekopoi App is used for Cat Hotel Bookings for your lovely cats, it also has delivery service',
      urlYoutube: 'https://www.youtube.com/shorts/NZt113dKABk',
      file: 'buku.pdf',
      photo: 'neko.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        id: 2,
        user_id: 14,
        title: 'SISTEM E-CATERING (STUDI KASUS DI JN RESTO)',
        abstract: 'JN Resto adalah suatu badan usaha bisnis catering yang bergerak dibidang penyedia makanan pada tahun 2022.',
        urlYoutube: 'https://www.youtube.com/shorts/NZt113dKABk',
        file: 'file.pdf',
        photo: 'sally-jnresto2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        user_id: 12,
        title: 'APLIKASI KOMUNITAS YUK NGAJI MOJOKERTO BERBASIS WEB DAN MOBILE',
        abstract: 'Yuk Ngaji Mojokerto adalah komunitas dari Yuk Ngaji yang menghimpun potensi lintas generasi dan profesi untuk berbagi ilmu dan inspirasi kebaikan.',
        urlYoutube: 'https://www.youtube.com/shorts/NZt113dKABk',
        file: 'buku.pdf',
        photo: 'shofi-yukngaji.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        user_id: 15,
        title: 'APLIKASI PENCATATAN KEUANGAN DI SWALAYAN EL-MALIK SUMENEP',
        abstract: 'Aplikasi Pencatatan Keuangan ini merupakan sebuah sistem yang digunakan untuk mempermudah karyawan swalayan dalam melakukan pencatatan keuangan transaksi baik pemasukan maupun pengeluaran.',
        urlYoutube: 'https://www.youtube.com/shorts/NZt113dKABk',
        file: 'buku.pdf',
        photo: 'alhamdi-swalayan.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        user_id: 13,
        title: 'APLIKASI SURVEY ONLINE MENGGUNAKAN METODE COLLABORATIVE FILTERING',
        abstract: 'Aplikasi Aplikasi Survey Menggunakan Metode Rekomendasi Collaborative Filtering adalah aplikasi yang memanfaatkan teknologi android dan web.',
        urlYoutube: 'https://www.youtube.com/shorts/NZt113dKABk',
        file: 'buku.pdf',
        photo: 'toimul-survey.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        user_id: 11,
        title: 'APLIKASI PEMESANAN PRODUK ONLINE BERBASIS WEBSITE DAN ANDROID ORGANISASI KARANG TARUNA PERRENG BHIRU DESA KASENGAN KEC. MANDING KAB. SUMENEP',
        abstract: 'Karang Taruna adalah organisasi sosial wadah pengembangan generasi muda yang tumbuh dan berkembang atas dasar kesadaran dan tanggung jawab sosial dari, oleh dan untuk masyarakat.',
        urlYoutube: 'https://www.youtube.com/shorts/NZt113dKABk',
        file: 'buku.pdf',
        photo: 'siti-pemesanan.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        user_id: 15,
        title: 'APLIKASI KOMUNITAS YUK NGAJI MOJOKERTO BERBASIS WEB DAN MOBILE',
        abstract: 'Yuk Ngaji Mojokerto adalah komunitas dari Yuk Ngaji yang menghimpun potensi lintas generasi dan profesi untuk berbagi ilmu dan inspirasi kebaikan.',
        urlYoutube: 'https://www.youtube.com/shorts/NZt113dKABk',
        file: 'buku.pdf',
        photo: 'shofi-yukngaji.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        user_id: 14,
        title: 'JOB SEEKER APPLICATION DEVELOPMENT WITH CACHING BASED ON AWS CLOUD FRONT (FRONTEND)',
        abstract: ' Dengan menggunakan teknologi, setiap orang dapat lebih mudah dan cepat mengakses berbagai informasi, salah satunya yang berkaitan dengan lowongan pekerjaan.',
        urlYoutube: 'https://www.youtube.com/shorts/NZt113dKABk',
        file: 'buku.pdf',
        photo: 'tarisamonggopakar.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        user_id: 12,
        title: 'SISTEM E-CATERING (STUDI KASUS DI JN RESTO)',
        abstract: 'JN Resto adalah suatu badan usaha bisnis catering yang bergerak dibidang penyedia makanan pada tahun 2022.',
        urlYoutube: 'https://www.youtube.com/shorts/NZt113dKABk',
        file: 'file.pdf',
        photo: 'sally-jnresto2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        user_id: 15,
        title: 'NekopoiApp',
        abstract: 'Nekopoi App is used for Cat Hotel Bookings for your lovely cats, it also has delivery service',
        urlYoutube: 'https://www.youtube.com/shorts/NZt113dKABk',
        file: 'buku.pdf',
        photo: 'neko.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    // return queryInterface.bulkDelete('projects', null, {});
  }
};

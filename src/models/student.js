'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: "user_id",
        as: 'users',
      });
    }
  }
  Student.init({
    user_id: {
      type: DataTypes.INTEGER
    },
    fullName: DataTypes.STRING,
    nrp: DataTypes.STRING,
    bio: DataTypes.STRING,
    gender: DataTypes.STRING,
    photo: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('photo');
        return process.env.BASE_URL_BACKEND +"/images/" + rawValue;
      }
    }
  }, {
    sequelize,
    modelName: 'student',
    tableName: 'students'
  });
  return Student;
};

// class StudentExample {
//   constructor(data){
//     this.id = data.id
//     this.user_id = data.user_id
//     this.fullname = data.fullname
//     this.nrp = data.nrp
//     this.bio = data.bio
//     this.gender = data.gender
//     this.photo = data.photo
//     this.createdAt = data.createdAt
//     this.updatedAt = data.updatedAt
//   }
// }


// module.exports = StudentExample

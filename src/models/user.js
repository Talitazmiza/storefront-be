require("dotenv").config();

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.role, {
        foreignKey: "role_id",
        as: "roles",
      });

      this.hasOne(models.student, {
        foreignKey: "student_id",
        as: "students",
      });
    }
  }
  User.init({
    role_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'users'
  });
  return User;
};
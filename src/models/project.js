'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // console.log(models)
      this.belongsTo(models.user, {
        foreignKey: "user_id",
        as: "users",
      });

    }
  }
  Project.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    abstract: DataTypes.STRING,
    urlYoutube: DataTypes.STRING,
    file: DataTypes.STRING,
    photo: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'project',
    tableName: 'projects'
  });
  return Project;
};
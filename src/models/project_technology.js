'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project_technology extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  project_technology.init({
    project_id: DataTypes.INTEGER,
    technology_id: DataTypes.INTEGER,
    url_github: DataTypes.STRING,
    url_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'project_technology',
  });
  return project_technology;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class technology_cluster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  technology_cluster.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'technology_cluster',
  });
  return technology_cluster;
};
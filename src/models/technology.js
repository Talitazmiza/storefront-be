'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class technology extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.technology_cluster, {
        foreignKey: "cluster_id",
        as: "technology_clusters",
      })

    }
  }
  technology.init({
    cluster_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'technology',
  });
  return technology;
};
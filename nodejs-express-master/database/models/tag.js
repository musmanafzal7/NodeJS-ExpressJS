'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Post)
    }
  }
  Tag.init({
    name: DataTypes.STRING,
    postId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'Tags',
    underscored: false,
  });
  return Tag;
};
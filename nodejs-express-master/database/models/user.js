'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const passportLocalSequelize = require('passport-local-sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post, {
        foreignKey: 'userId',
        onDelete: 'SET NULL',
      });
    }
    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  User.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    contact: DataTypes.STRING,
    streetAddress: DataTypes.STRING,
    city: DataTypes.STRING,
    gender: DataTypes.STRING,
    dob: DataTypes.DATEONLY,      
    password: DataTypes.STRING,
    profile: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    salt: DataTypes.STRING,
    jwtToken: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (user, options) => {
        if (user.password) {
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(user.password, salt);
          user.password = hash;
          user.salt = salt;
        }
      }
    },
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: false,
  });
  // passportLocalSequelize.attachToUser(User, {
  //   userExistsError: 'User already exists with email "%s"',
  //   usernameField: 'email',
  //   hashField: 'password',
	//   saltField: 'salt',
  //   usernameLowerCase: true,
  // });
  return User;
};
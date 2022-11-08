const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('./../db');

const User = db.define(
  'user',
  {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        min: 6,
      },
      allowNull: false,
      get() {
        return () => this.getDataValue('password');
      },
    },
    salt: {
      type: Sequelize.STRING,
      get() {
        return () => this.getDataValue('salt');
      },
    },
  },
  {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  }
);

User.correctPassword = function (user, password) {
  return bcrypt.compareSync(password, user.password());
};

User.createSalt = function () {
  return bcrypt.genSaltSync(8);
};

User.encryptPassword = function (plainPassword, salt) {
  return bcrypt.hashSync(plainPassword, salt);
};

const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    user.salt = User.createSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate((users) => {
  users.forEach(setSaltAndPassword);
});

User.findUserById = async function (userId) {
  return User.findOne({
    where: {
      id: userId,
    },
  });
};

User.findUserByUsername = async function (username) {
  return User.findOne({
    where: {
      username: username,
    },
  });
};

module.exports = User;

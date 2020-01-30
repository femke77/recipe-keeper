module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 20]
      }
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Recipe);
  };

  return User;
};

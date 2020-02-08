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
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 20]
      }
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: null,
      unique: true,
      validate: {
        len: [1]
      }
    }
    // lastLogin: {
    //   type: DataTypes.DATE
    // },
    // status: {
    //   type: DataTypes.ENUM("active", "inactive"),
    //   defaultValue: "active"
    // }
  });

  User.associate = function(models) {
    User.hasMany(models.Recipe);
    User.belongsToMany(models.Recipe, {
      as: "Saves",
      through: "Save"
    });
    User.hasMany(models.Note);
  };

  return User;
};

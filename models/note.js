module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define("Note", {
    note: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Note.associate = function(models) {
    //By default the foreign key for a belongsTo relation will be generated
    //from the target model name and the target primary key name
    Note.belongsTo(models.Recipe, {
      foreignKey: {
        unique: "uniqueNote"
      }
    }); // fk 'RecipeId'
    Note.belongsTo(models.User, {
      foreignKey: {
        unique: "uniqueNote"
      }
    }); // fk 'UserId'
  };

  return Note;
};

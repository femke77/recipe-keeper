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
    Note.belongsTo(models.Recipe); // fk 'recipeId'
    Note.belongsTo(models.User); // fk 'userId'
  };

  return Note;
};

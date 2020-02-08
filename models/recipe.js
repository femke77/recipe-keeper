module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    servings: DataTypes.INTEGER,
    ingredients: {
      type: DataTypes.JSON,
      allowNull: false
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: DataTypes.STRING,
    category: DataTypes.STRING,
    dishType: DataTypes.STRING,
    source: DataTypes.STRING
  });

  //We associate the user's id with the recipe so we know who created/submitted the recipe
  //The relationship is that one user may post many recipes to the site
  Recipe.associate = function(models) {
    Recipe.belongsTo(models.User, {
      // will make FK 'userId'
      foreignKey: {
        allowNull: true
      }
    });
    //this is how the users will save recipes (many to many)
    Recipe.belongsToMany(models.User, {
      as: "Saves",
      through: "Save"
    });
    //a recipe can have notes made by any number of users associated with it
    Recipe.hasMany(models.Note);
  };

  return Recipe;
};

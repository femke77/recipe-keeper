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
      type: DataTypes.JSON,
      allowNull: false
    },
    image: DataTypes.STRING,
    category: DataTypes.STRING,
    dishType: DataTypes.STRING,
    postedBy: DataTypes.INTEGER,
    userNotes: DataTypes.TEXT
  });

  //We associate the user's id with the recipe's postedBy field
  //The relationship is that one user may post many recipes to the site
  Recipe.associate = function(models) {
    Recipe.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Recipe;
};

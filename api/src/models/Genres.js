const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("genres", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM(
        "Action",
        "Indie",
        "Adventure",
        "RPG",
        "Strategy",
        "Shooter",
        "Casual",
        "Simulation",
        "Puzzle",
        "Arcade",
        "Platformer",
        "Racing",
        "Massively Multiplayer",
        "Sports",
        "Fighting",
        "Family",
        "Board Games",
        "Educational",
        "Card"
      ),
      allowNull: false,
    },
  });
};

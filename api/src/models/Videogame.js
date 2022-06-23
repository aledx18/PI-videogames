const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 5.5,
    },
    parent_platforms: {
      type: DataTypes.ENUM("Xbox", "PlayStation", "PC"),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://media.rawg.io/media/screenshots/971/971d3582a42ede482b9d90b47b50ac32.jpg",
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};

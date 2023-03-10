const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    height: {
      type: DataTypes.STRING,
    },
    min_weight: {
      type: DataTypes.STRING,
    },
    max_weight: {
      type: DataTypes.STRING,
    },
    years: {
      type: DataTypes.STRING,
    },
    img: {
      type: DataTypes.STRING,
    },
    comida: {
      type: DataTypes.STRING
    }
  },
    { timestamps: false });
};

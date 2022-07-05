const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Genre', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
    },
    {
        timestamps: false,
    });
  };
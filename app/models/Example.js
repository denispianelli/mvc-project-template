// on importe l'instance de sequelize
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/sequelize-client');

// on défini notre Model et on y ajoute le Model de sequelize

// TODO
class Example extends Model {}

// on indique a sequelize quels sont les attributs de notre Model en fonction de ses propriétés dans notre bdd

Example.init(
  {
    attribut1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attribut2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'example',
  }
);

module.exports = Example;


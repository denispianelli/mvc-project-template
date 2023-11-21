// on importe sequelize
const { Sequelize } = require('sequelize');

// instance de connexion à la bdd Postgres
const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: 'postgres',
  define: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

// on exporte l'instance de connexion
module.exports = sequelize;

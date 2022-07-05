require('dotenv').config();
const { Sequelize } = require('sequelize');
const path = require('path');
const modelVideogame = require ('./models/Videogame')
const modelGenre = require('./models/Genres')
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

//Ejecutamos los models

modelVideogame(sequelize)
modelGenre(sequelize)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genre } = sequelize.models;

//Relación muchos a muchos entre videojuego y género

Videogame.belongsToMany(Genre,{through: "Videogame_Genre"})
Genre.belongsToMany(Videogame, {through: "Videogame_Genre"})

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Videogame, Genre } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};

const { configDotenv } = require('dotenv');
// charge les variables d'environnement
configDotenv();

// importe les modules
const express = require('express');
const router = require('./app/router');
const { initSession } = require('./middleware/');

// importe les middlewares
// créer l'application express
const app = express();

// configure la gestion des views
app.set('view engine', 'ejs');
app.set('views', './app/views');

// expose le contenu du dossier public
app.use(express.static('public'));

// permet de récupérer le contenu des requêtes POST
app.use(express.urlencoded({ extended: true }));

// initialise la session
app.use(initSession);

// branche le router
app.use(router);

// gère les requêtes qui mènent a une 404
app.use((req, res) => {
  res.status(404).render('404');
});

// défini le port et l'url de base
const port = process.env.PORT || 3000;
const url = process.env.BASE_URL || 'http://localhost';

// lance le server
app.listen(port, () => {
  console.log(`Listening on ${url}:${port}`);
});

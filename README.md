# Model-View-Controller new project

The template has already been completed.  
Simply clone it and enter the following command in the terminal:

```bash
npm install
```

These are the steps taken to complete the template.

## 1. Initialiser le projet

```bash
npm init 
```

## 2. Télécharger les modules nécessaires

```bash
npm i express // Pour mettre en place le server
npm i express-session // Pour mettre en place la session
npm i dotenv // Pour récupérer les variables dans le .env
npm i ejs // Pour créer nos vues
npm i pg // Pour se connecter à notre db
npm i pg pg-hstore // Pour sequelize
npm i sequelize // Pour gérer nos requête à la bdd
npm i -D nodemon // Pour ne pas avoir besoin de relancer le server à chaque modification
```

## 3. Mise en place de notre index.js

```jsx
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
```

## 4. Mise en place des middlewares

⇒ middleware/initSession.js

```jsx
// on met en place notre middleware afin de générer une session
const session = require('express-session');

const initSession = session({
  secret: process.env.APP_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
  },
});

module.exports = initSession;
```

⇒ middleware/index.js

```jsx
// on importe tous nos middlewares ici pour créer un hub
const initSession = require('./initSession');

// on exporte tous nos middlewares
module.exports = {
  initSession,
};
```

## 5. On défini le .env et le .env.example

```bash
BASE_URL=http://localhost
PORT=3000
PG_URL=postgres://USER:PASSWORD@HOST/DATABASE // remplir les champs selon la db
APP_SECRET=SECRET_STRING // inclure une string complexe
```

## 6. On branche notre base de donnée

⇒ app/database/sequelize-client.js

```jsx
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
```

## 7. On défini nos Models

⇒ app/models/Example.js

```jsx
// on importe l'instance de sequelize
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/sequelize-client');

// on défini notre Model et on y ajoute le Model de sequelize
class Example extends Model {}

// on indique a sequelize quels sont les attributs de notre Model 
// en fonction de ses propriétés dans notre bdd
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
```

## 8. On défini les associations de nos Models

```jsx
// on importe tous nos Models ici pour définir leurs associations 
const Example = require('./Example');

// TODO
// définir les associations
// DOC: https://sequelize.org/docs/v6/core-concepts/assocs/

// One-to-One : hasOne + belongsTo
// One-to-Many : hasMany + belongsTo
// Many-to-Many : belongsToMany + belongsToMany

// on exporte tous nos Models
module.exports = { Example };
```

## 9. On défini nos views

## 10. On défini nos controllers

⇒ app/controllers

```jsx
// on défini notre main controller
const mainController = {
// on défini la méthode qui va nous servir a rendre la view home
  renderHomePage(req, res) {
    res.render('home');
  },
};

module.exports = mainController;
```

## 11. On défini nos routes

⇒ app/router

```jsx
const { Router } = require('express');

// on importe nos controllers
const { mainController } = require('../controllers');

const router = Router();

// on défini nos routes, les middlewares si nécessaire, le controller et sa méthode
router.get('/', mainController.renderHomePage);

module.exports = router;
```

## 12. On lance le server et on vérifie que la home page renvois bien ‘init’

```bash
npm run dev
```

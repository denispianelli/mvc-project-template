const { Router } = require('express');

// on importe nos controllers
const { mainController } = require('../controllers');

const router = Router();

// on défini nos routes, les middlewares si nécessaire, le controller et sa méthode
router.get('/', mainController.renderHomePage);

module.exports = router;

// on défini notre main controller
const mainController = {
	// on défini la méthode qui va nous servir a rendre la view home
  renderHomePage(req, res) {
    res.render('home');
  },
};

module.exports = mainController;

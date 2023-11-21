// On importe tous nos middlewares ici pour en faire un hub
const initSession = require('./initSession');

// On exporte tous nos middlewares
module.exports = {
  initSession,
};

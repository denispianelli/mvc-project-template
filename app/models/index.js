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

const store = require('../../../store/mysql');
const ctlr = require('./controller');

module.exports = ctlr(store);
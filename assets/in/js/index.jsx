/**
 * Pull In ReactDOM
 */
var ReactDOM = require('react-dom');
/**
 * Pull in the routes
 */
var GaggleRoutes = require('./routes.jsx');

ReactDOM.render(GaggleRoutes, document.querySelector('#gaggle'));

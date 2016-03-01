var React       = require('react');
var ReactRouter = require("react-router");

var Router     = ReactRouter.Router;
var Route      = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var BrowserHistory = ReactRouter.browserHistory;

var App = require('./routes/app.jsx');

// General template components
var ViewLearn  = require('./routes/view-learn.jsx');
var ViewLookup = require('./routes/view-lookup.jsx');

var GaggleRoutes = (
  <Router history={BrowserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ViewLearn} />
      <Route path="/lookup" component={ViewLookup} />
    </Route>
  </Router>
);

module.exports = GaggleRoutes;

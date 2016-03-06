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
var ViewSubmit = require('./routes/view-submit.jsx');

var GaggleRoutes = (
  <Router history={BrowserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ViewLearn} />
      <Route name="RouteLearn" path="/learn" component={ViewLearn} />
      <Route name="RouteLookup" path="/lookup" component={ViewLookup} />
      <Route name="RouteSubmit" path="/submit" component={ViewSubmit} />
    </Route>
  </Router>
);

module.exports = GaggleRoutes;

var React = require('react');

// Components
var ReactRouter  = require("react-router");
var Link = ReactRouter.Link;

// var Footer = require('../components/footer.jsx');
// var Header = require('../components/header.jsx');

var App = React.createClass({
  getInitialState : function() {
    return {};
  },

  render : function() {
    return (
      <div className="app_wrapper">
        hello
        {this.props.children}
      </div>
    )
  },
});
module.exports = App;

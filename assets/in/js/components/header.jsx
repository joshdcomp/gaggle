/**
* REACT!!
*/
var React = require('react');

/**
* Compontents
*/
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var IndexLink = ReactRouter.IndexLink;
var Icon = require('./icon.jsx');
/**
* Modules
*/
var Nav = require('./nav.jsx');

/**
* The Module Actual
*/
var Header = React.createClass({
  displayName: 'Header',
  getInitialState: function() {
    return {
    }
  },
  componentDidMount: function() {
  },

  render: function() {
    var classes = [
      'header'
    ];
    return (
      <header
        className={classes.join(' ')}
      >
        <div className="header--container">
          <div className="header--logo">
            <Icon
              glyph="gaggle-logo"
            />
          </div>

          <Nav
            className="header--nav"
            />
        </div>
      </header>
    )
  }
});
module.exports = Header;

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
var Constants = require('../constants.jsx');
/**
* Modules
*/
var Nav = require('./nav.jsx');
var Icon = require('./_icon.jsx');

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
    var wrapperClasses = [
      'header',
    ];
    return (
      <header
        className={wrapperClasses.join(' ')}
      >
        <div className="header--container">
          <Link
            to="/"
            className="header--logo"
          >
            <Icon
              glyph={this.logoGlyph()}
              className="header--logo_svg"
            />
          </Link>

          <Nav
            className="header--nav"
            />
        </div>
      </header>
    )
  },

  logoGlyph: function () {
    var alts = Constants.logoAlts;
    var location = window.location.pathname.substr(1).split('/')[0];

    return (alts.hasOwnProperty(location))
      ? alts[location]
      : alts['default'];
  }
});
module.exports = Header;

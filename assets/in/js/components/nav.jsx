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

/**
 * Modules
 */


/**
 * The Module Actual
 */
var Nav = React.createClass({
  displayName: 'Nav',
  getInitialState: function() {
    return {
    }
  },
  componentDidMount: function() {
  },

  render: function() {
    var classes = [
      'nav',
      this.props.className,
    ];

    return (
      <ul className={classes.join(' ')}>
        <li className={this.itemClasses('learn')}>
          <Link to="/learn" className="nav--link">Learn</Link>
        </li>

        <li className={this.itemClasses('lookup')}>
          <Link to="/lookup" className="nav--link">Lookup</Link>
        </li>

        <li className={this.itemClasses('submit')}>
          <Link to="/submit" className="nav--link">Submit</Link>
        </li>
      </ul>
    )
  },

  itemClasses: function(current) {
    var result = ['nav--li'];
    var location = window.location.pathname.substr(1).split('/')[0];

    if (current === location) {
      result.push('nav--li_current');
    }

    return result.join(' ');
  },
});
module.exports = Nav;

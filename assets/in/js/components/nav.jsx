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
        <li className="nav--li">
          <Link to="/lookup" className="nav--link">Learn</Link>
        </li>

        <li className="nav--li">
          <Link to="/lookup" className="nav--link">Lookup</Link>
        </li>

        <li className="nav--li">
          <Link to="/submit" className="nav--link">Submit</Link>
        </li>
      </ul>
    )
  }
});
module.exports = Nav;

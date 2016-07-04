var React = require('react');
var ReactRouter = require("react-router");
var AnimalStore = require("../stores/AnimalStore.js");
var IllustrationStore = require('../stores/IllustrationStore.js');
var NounStore = require('../stores/NounStore.js');

var ViewLookup = React.createClass({
  displayName: 'Lookup',
  //---------------------------------------------------
  // React Lifecycle/Defaults
  //--
  mixins: [ ReactRouter.Navigation ],//you'll want this, trust me
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      query: '',
      results: [],
    };
  },

  // getDefaultProps: function() {
  //   return {

  //   };
  // },

  // componentWillMount: function() {

  // },

  // componentDidMount: function() {

  // },

  // componentWillUnmount: function() {

  // },
  //---------------------------------------------------
  // Render Functions
  //--
  render: function() {
    return (
      <div className="view view-lookup">
        <div className="view--content">
          <header className="lookup--switcher">
            <h2 className="view--title lookup--switcher_current">What could you call...</h2>
          </header>

          <p className="lookup--query">
            A group of

            <input
              type="text"
              value={this.state.query}
              className="lookup--term"
              onChange={this.queryUpdate}
            />?
          </p>

          {this.renderResult()}
        </div>
      </div>
    );
  },

  renderResult: function() {

    if (this.state.results.length < 1) {
      return (<div className="lookup--result lookup--results_null">…nothing apparently</div>);
    }

    return (
      <div className="lookup--results">
        <ul className="lookup--result_list">
          {
          this.state.results.map(function(result, i) {
            return (
              <li className="lookup--result_item" key={i}>A <strong>{result}</strong></li>
            );
          })
          }
        </ul>
      </div>
    );
  },

  //---------------------------------------------------
  // Consumer-defined functions
  //--
  queryUpdate: function(e) {
    var val = e.target.value;
    var query = val || ' ';
    var results = AnimalStore.get(query) || [];

    if (results.length > 0) {
      setTimeout(
        function() {
          this.context.router.push(['/lookup', 'animal', val].join('/'))
        }.bind(this),
        20
      );
    }

    this.setState({
      query: val,
      results: results,
    })


  },
});
module.exports = ViewLookup;

var React        = require('react');
var ReactRouter  = require("react-router");

//react Bootstrap

//Login
module.exports = React.createClass({
  displayName: 'TextInput',
  getInitialState: function() {
    return {
      label: this.props.label || '',
      value: '',
      wrapperClasses: [
        'form--field_wrapper',
        'text-input',
      ],
    };
  },
  getValue: function () {
    return this.state.value;
  },
  handleChange: function (e) {
    var newValue = e.target.value;
    this.setState({
      value: newValue,
    })
    //make sure parentCallback exists
    this.props.parentCallback(e, this.props.formField, newValue);
  },
  render: function() {
    // so we can use html5 form types like email and number and password
    var type = (this.props.hasOwnProperty('inputType'))
      ? this.props.inputType
      : 'text';

    // inputs should have a unique name/id
    var inputName = (this.props.hasOwnProperty('inputName'))
      ? this.props.inputName
      : '';
    var inputID = 'form--' + inputName;

    var ref = (this.props.hasOwnProperty('ref'))
      ? this.props.ref
      : 'textInput';

    return (
      <div className={this.state.wrapperClasses.join(' ')}>
        <label
          htmlFor={this.props.inputName}
          className='text-input--label form--field_label'
        >{this.props.label}</label>

        <input
          id={inputID}
          name={inputName}
          type={type}
          ref={ref}
          value={this.state.value}
          className='text-input--input form--field_input'
          onChange={this.handleChange}
        />
      </div>
    )
  }
});

var Input = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.value
    };
  },

  getDefaultProps: function() {
    return {
      type: 'text',
      value: '',
      label: '',
      name: '',
      required: false,
      disabled: false,
      placeholder: '',
      showClearButtonWithInput: false,
      onChange: () => { console.log('default on change') }
    }
  },

  componentWillReceiveProps: function(props) {
    this.setState({
      value: props.value
    });
  },

  render: function() {
    if(this.props.type === 'checkbox') {
      return this.renderCheckbox();
    } else if(this.props.type === 'radio') {
      return this.renderRadio();
    } else if(this.props.type === 'textarea') {
      return this.renderTextarea();
    } else if(this.props.type === 'select') {
      return this.renderSelect();
    } else {
      return this.renderDefault();
    }
  },

  renderDefault: function() {
    return(
      <div className={classnames("form-component", this.props.type, this.props.className)}>
        {(this.props.label) ? [<label key="label">{this.props.label}</label>] : []}
        <input
          type={this.props.type}
          name={this.props.name}
          ref={this.props.ref}
          step="0.01"
          value={this.state.value}
          autoComplete="off"
          className={classnames(
              "form-control",
              {'disabled': this.props.disabled}
              )}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          onChange={this.onChange}
          onKeyUp={this.handleKeyUp} />

          <div className={classnames("clear-search", {'show-button': this.state.value !== '' && this.props.showClearButtonWithInput})} onClick={this.clearFilterInput}>
            <i className="fa fa-times-circle" />
          </div>
      </div>
    );
  },

  renderCheckbox: function() {
    var randomID = Math.floor(Math.random() * (10000 - 0)) + 0;

    return(
      <div className={classnames("form-component", this.props.type, this.props.className)}>
        <div className="checkbox-wrapper">
          <input
            type={this.props.type}
            name={this.props.name}
            ref={this.props.ref}
            value={this.state.value}
            checked={this.state.value}
            className={classnames(
                "form-control",
                {'disabled': this.props.disabled}
                )}
            disabled={this.props.disabled}
            placeholder={this.props.placeholder}
            onChange={this.onChange}
            onKeyUp={this.handleKeyUp}
            id={'switch-' + this.props.name + randomID} />
          <label htmlFor={'switch-' + this.props.name + randomID} className="switch"></label>
        </div>

        {(this.props.label) ? [<div className="label" key="label" onClick={this.checkboxLabelClick}>{this.props.label}</div>] : []}
      </div>
    );
  },

  renderRadio: function() {
    var randomID = Math.floor(Math.random() * (10000 - 0)) + 0;

    return(
      <div className={classnames("form-component", this.props.type, this.props.className)}>
        <div className="checkbox-wrapper">
          <input
            type={this.props.type}
            name={this.props.name}
            ref={this.props.ref}
            value={this.state.value}
            checked={this.state.value}
            className={classnames(
                "form-control",
                {'disabled': this.props.disabled}
                )}
            disabled={this.props.disabled}
            placeholder={this.props.placeholder}
            onChange={this.onChange}
            onKeyUp={this.handleKeyUp}
            id={'switch-' + this.props.name + randomID} />
          <label htmlFor={'switch-' + this.props.name + randomID} className="switch"></label>
        </div>

        {(this.props.label) ? [<div className="label" key="label" onClick={this.checkboxLabelClick}>{this.props.label}</div>] : []}
      </div>
    );
  },

  renderTextarea: function() {
    return(
      <div className={classnames("form-component", this.props.type, this.props.className)}>
        {(this.props.label) ? [<label key="label">{this.props.label}</label>] : []}
        <textarea
          name={this.props.name}
          value={this.state.value}
          ref={this.props.ref}
          className={classnames(
              "form-control",
              {'disabled': this.props.disabled}
              )}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          onChange={this.onChange}
          onKeyUp={this.handleKeyUp} />
      </div>
    );
  },

  renderSelect: function() {
    return(
      <div className={classnames("form-component", this.props.type, this.props.className)}>
        {(this.props.label) ? [<label key="label">{this.props.label}</label>] : []}
        <select
          type={this.props.type}
          name={this.props.name}
          ref={this.props.ref}
          value={this.state.value}
          className={classnames(
              "form-control select",
              {'disabled': this.props.disabled}
              )}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          onChange={this.onChange}>
          {this.props.children}
        </select>
      </div>
    );
  },

  onChange: function(e) {
    var value = (e.target.type === 'checkbox') ? e.target.checked : e.target.value;
    this.setState({
      value: value
    })

    if(typeof this.props.onChange === 'function') {
      this.props.onChange(e, value, this.props.name);
    }
  },

  checkboxLabelClick: function(e) {
    var value = !this.state.value;
    this.setState({
      value: value
    })

    if(typeof this.props.onChange === 'function') {
      this.props.onChange(e, value, this.props.name);
    }
  },


  // Custom Methods
  ////////////////////////

  handleKeyUp: function(e) {
    e.stopPropagation();

    if(typeof this.props.onKeyUp === 'function') {
      this.props.onKeyUp(e);
    }
  },

  clearFilterInput: function(e) {
    this.setState({
      value: ''
    });

    if(typeof this.props.onChange === 'function') {
      this.props.onChange({target: {name: this.props.name, value: ''}}, '', this.props.name);
    }
  }
});
module.exports = Input;

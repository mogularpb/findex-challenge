import React, { Component } from 'react';

class FormGroup extends Component {
  passChangeUpToParent = (evt) => {
    const { onChangeFunction, field } = this.props;
    onChangeFunction(field, evt.target.value);
  };


  render() {
    const {
      field, placeholder, validator, validationText,
    } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={field} className="sr-only" id={field}>
          Postcode
        </label>
        <input
          name={field}
          type="text"
          id={field}
          className="form-control"
          placeholder={placeholder}
          required=""
          onBlur={this.passChangeUpToParent}
        />
        {Object.prototype.hasOwnProperty.call(validator, field) && !validator[field] && (
          <small className="form-text text-danger text-left">
            {validationText}
          </small>
        )}
      </div>
    );
  }
}

export default FormGroup;

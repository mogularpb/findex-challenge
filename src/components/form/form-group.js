import React, { Component } from 'react';

class FormGroup extends Component {
  passChangeUpToParent = (evt) => {
    const { onChangeFunction, field } = this.props;
    const { value } = evt.target || evt;
    onChangeFunction({
      field,
      value,
    });
  };


  render() {
    const {
      field, placeholder, validator, validationText, CustomInput, options, currentFieldValues,
    } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={field} className="sr-only" id={field}>
          Postcode
        </label>
        {!CustomInput
          ? (
            <input
              name={field}
              type="text"
              id={field}
              className="form-control"
              placeholder={placeholder}
              required=""
              onBlur={this.passChangeUpToParent}
            />
          )
          : (
            <CustomInput
              {...this.props}
              name={field}
              id={field}
              onChange={this.passChangeUpToParent}
              value={currentFieldValues[field] && options.find(option => option.value === currentFieldValues[field])}
            />
          )
        }
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

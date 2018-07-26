import React, { Component } from 'react';

class FormGroup extends Component {
  passChangeUpToParent = (event) => {
    const { onChangeFunction, field } = this.props;
    const { value } = event.target || event;
    onChangeFunction({
      field,
      value,
    });
  };

  render() {
    const {
      field, placeholder, validator, validationText, useOnBlur, useOnChange, InjectedInput,
    } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={field} className="sr-only" id={field}>
          {placeholder}
        </label>
        <InjectedInput
          {...this.props}
          onBlur={useOnBlur && this.passChangeUpToParent}
          onChange={useOnChange && this.passChangeUpToParent}
        />
        {validator && Object.prototype.hasOwnProperty.call(validator, field) && !validator[field] && (
          <small className="form-text text-danger text-left">
            {validationText}
          </small>
        )}
      </div>
    );
  }
}

export default FormGroup;

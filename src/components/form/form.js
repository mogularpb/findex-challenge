import React, { Component } from 'react';
import Events from '../events';
import FormGroup from './form-group';
import { getEvents, getGenres } from '../../api/api';
import inputText from './input-text';
import inputSelect from './input-select';

class TicketMasterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedEvents: [],
      fields: {},
      validFields: {},
      genres: [],
    };
  }

  componentDidMount() {
    getGenres().then((res) => {
      const { data: { _embedded: { classifications } } } = res;
      this.setState({
        genres: classifications.filter(item => item.type).map(({ type: { name, id } }) => ({
          label: name,
          value: id,
        })),
      });
    });
  }

  getEvents(fields) {
    getEvents(fields).then((res) => {
      const { data: { _embedded: events } } = res;
      this.setState({
        displayedEvents: events.events,
      });
    });
  }

  validator = (field, value) => {
    switch (field) {
      case 'postalCode':
        return !Number.isNaN(Number.parseInt(value, 10)) && value.length === 4;
      default:
        return true;
    }
  };

  validateField = ({ field, value }) => {
    const { fields, validFields } = this.state;
    if (this.validator(field, value)) {
      this.setState({
        validFields: { ...validFields, [field]: true },
        fields: { ...fields, [field]: value },
      });
      return true;
    }
    this.setState({
      validFields: { ...validFields, [field]: false },
      fields: { ...fields, [field]: null },
    });
    return false;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { validFields, fields } = this.state;
    const checkForInvalidFields = Object.values(validFields).some(field => field === false);
    if (!checkForInvalidFields) {
      this.setState({ displayedEvents: [] });
      this.getEvents(fields);
    }
  };

  handleOnChange = (inputParams) => {
    this.validateField(inputParams);
  };

  render() {
    const {
      displayedEvents = [], validFields, genres = [], fields = {},
    } = this.state;
    return (
      <div className="text-center">
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">
            Find an event in your area
          </h1>
          <FormGroup
            field="postalCode"
            placeholder="Postcode"
            onChangeFunction={this.handleOnChange}
            validator={validFields}
            validationText="Please enter a 4 digit postcode"
            InjectedInput={inputText}
            useOnBlur
          />
          <FormGroup
            field="genreId"
            placeholder="Genre"
            onChangeFunction={this.handleOnChange}
            selectOptions={genres}
            allPopulatedFields={fields}
            InjectedInput={inputSelect}
            useOnChange
          />
          <FormGroup
            field="keyword"
            placeholder="Include a keyword"
            onChangeFunction={this.handleOnChange}
            InjectedInput={inputText}
            useOnBlur
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Find event
          </button>
        </form>
        {displayedEvents.length > 0
        && <Events events={displayedEvents} />
        }
      </div>
    );
  }
}

export default TicketMasterForm;

import React, { Component } from 'react';
import apiGet from '../../api/api';
import Events from '../events';
import FormGroup from './form-group';
import { getEvents, getGenres } from '../../api/api';

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

  validator = (field, val) => {
    switch (field) {
      case 'postalCode':
        return !Number.isNaN(Number.parseInt(val, 10)) && val.length === 4;
      default:
        return true;
    }
  };

  validateField = (field, value) => {
    if (this.validator(field, value)) {
      this.setState({
        validFields: { [field]: true },
        fields: { [field]: value },
      });
      return true;
    }
    this.setState({
      validFields: { [field]: false },
      fields: { [field]: null },
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

  handleOnChange = (field, value) => {
    this.validateField(field, value);
  };

  render() {
    const { displayedEvents = [], validFields } = this.state;
    return (
      <div className="text-center">
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">
            Find an event in your area
          </h1>
          <FormGroup
            field="postalCode"
            placeholder="Postcode"
            validator={validFields}
            onChangeFunction={this.handleOnChange}
            validationText="Please enter a 4 digit postcode"
          />
          <FormGroup
            field="keyword"
            placeholder="Genre or type"
            validator={validFields}
            onChangeFunction={this.handleOnChange}
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

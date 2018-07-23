import React, { Component } from 'react';
import apiGet from '../../api/api';
import Events from '../events';

class TicketMasterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      formInputIsValid: true,
    };
  }

  getEvents(postcode) {
    apiGet(postcode).then((res) => {
      const { data: { _embedded: events } } = res;
      this.setState({
        events: events.events,
      });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const postcode = this.postCodeNode.value;
    this.setState({ formInputIsValid: true, events: [] });
    if (!Number.isNaN(Number.parseInt(postcode, 10)) && postcode.length === 4) {
      this.getEvents(postcode);
    } else {
      this.setState({
        formInputIsValid: false,
      });
    }
  };

  render() {
    const { events = [], formInputIsValid } = this.state;
    return (
      <div className="text-center">
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">
            Find an event in your area
          </h1>
          <div className="form-group">
            <label htmlFor="postCode" className="sr-only" id="postCode">
              Postcode
            </label>
            <input
              name="postcode"
              type="text"
              id="postCode"
              className="form-control"
              placeholder="Postcode"
              required=""
              ref={(node) => {
                this.postCodeNode = node;
              }}
            />
            {!formInputIsValid && (
              <small className="form-text text-danger text-left">
                Please enter a 4 digit postcode
              </small>
            )}
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Find event
          </button>
        </form>
        {events.length > 0
        && <Events events={events} />
        }
      </div>
    );
  }
}

export default TicketMasterForm;

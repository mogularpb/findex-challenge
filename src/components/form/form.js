import React, { Component } from 'react';
import apiGet from '../../api/api';

class TicketMasterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }


  componentWillMount() {
    apiGet('3001').then((res) => {
      const { data: { _embedded: events } } = res;
      console.log(events);
      console.log(JSON.stringify(events.events[0]));
      this.setState({
        events: events.events,
      });
    });
  }

  render() {
    const { events = [] } = this.state;
    const showEvents = events.map(event => (
      <li key={event.id}>
        {event.name}
      </li>
    ));
    // const showEvents = null;
    return (
      <div className="text-center">
        <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">
            Find an event in your area
          </h1>
          <label htmlFor="postCode" className="sr-only" id="postCode">
            Postcode
          </label>
          <input
            name="email"
            type="email"
            id="postCode"
            className="form-control"
            placeholder="Postcode"
            required=""
          />
          <br />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Find event
          </button>
        </form>
        <ul>
          {showEvents}
        </ul>
      </div>
    );
  }
}

export default TicketMasterForm;

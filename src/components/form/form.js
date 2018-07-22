import React, { Component } from 'react';
import apiGet from '../../api/api';

class TicketMasterForm extends Component {

  componentWillMount() {
    apiGet('3001').then(res => console.log(res));
  }

  render() {
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
      </div>
    );
  }
}

export default TicketMasterForm;

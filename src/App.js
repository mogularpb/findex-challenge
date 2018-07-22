import React from 'react';
import './App.css';

const App = () => (
  <div className="container">
    <div className="row">
      <div className="col">
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
      </div>
    </div>
  </div>);

export default App;

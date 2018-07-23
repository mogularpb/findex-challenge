import React from 'react';

const ShowEvents = ({ events = [] }) => events.map((event) => {
  const {
    name,
    dates: {
      start: {
        localDate,
      },
    },
    _embedded: {
      venues,
    },
  } = event;
  return (
    <tr key={event.id}>
      <th scope="row">
        {name}
      </th>
      <td>
        {localDate}
      </td>
      <td>
        {venues.map(venue => (
          <span key={venue.id}>
            {venue.name}
          </span>
        ))}
      </td>
    </tr>
  );
});

const Events = ({ events }) => (
  <table className="table">
    <thead className="thead-dark">
      <tr>
        <th scope="col">
        Event
        </th>
        <th scope="col">
        Date
        </th>
        <th scope="col">
        Venue
        </th>
      </tr>
    </thead>
    <tbody>
      <ShowEvents events={events} />
    </tbody>
  </table>
);

export default Events;

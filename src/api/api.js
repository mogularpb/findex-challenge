import axios from 'axios';

export const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
const apiKey = 'Tr7s2LYmcZiFHTL2FXuz2uTjA8XfzyEn';
const apiGet = postcode => axios.get(`${baseUrl}?apikey=${apiKey}&postalCode=${postcode}`)
  .then(res => res);

export default apiGet;

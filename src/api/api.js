import axios from 'axios';

export const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
const apiKey = 'Tr7s2LYmcZiFHTL2FXuz2uTjA8XfzyEn';

const apiGet = (fields) => {
  const convertFieldsToArray = Object.entries(fields);
  const queryStrings = convertFieldsToArray.map(field => `&${field[0]}=${field[1]}`).join();
  return axios.get(`${baseUrl}?apikey=${apiKey}${queryStrings}`)
    .then(res => res);
};

export default apiGet;

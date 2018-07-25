import axios from 'axios';

export const baseUrl = 'https://app.ticketmaster.com/discovery/v2';
const apiKey = 'Tr7s2LYmcZiFHTL2FXuz2uTjA8XfzyEn';
const apiKeyQueryParam = `?apikey=${apiKey}`;

const buildParamQueryString = params => (
  params
    ? Object.entries(params)
      .map(([key, value]) => `&${key}=${value}`)
      .join()
    : ''
);
const buildApiCall = resource => params => axios.get(`${baseUrl}/${resource}.json${apiKeyQueryParam}${buildParamQueryString(params)}`);

export const getEvents = params => buildApiCall('events')(params);
export const getGenres = () => buildApiCall('classifications')();

import axios from 'axios';

export const api = axios.create({
  baseURL:'https://api.github.com/users/'
});

export const apiGraph = axios.create({
  baseURL:'https://graphql.datocms.com/'
});
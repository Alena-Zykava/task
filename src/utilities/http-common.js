import axios from 'axios';

// const URL = 'https://thingproxy.freeboard.io/fetch/https://www.mrsoft.by/';
const URL = 'https://api.allorigins.win/raw?url=https://www.mrsoft.by'

export const httpWords = axios.create({
    baseURL: URL,
    responseType: 'json'
  });
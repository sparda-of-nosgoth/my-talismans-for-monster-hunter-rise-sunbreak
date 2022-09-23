import axios from 'axios';

export interface GoogleCredentials {
  client_email: string;
  private_key: string;
  token_uri: string;
}

const googleAuthApi = axios.create({ baseURL: 'https://oauth2.googleapis.com' });
const googleSheetsApi = axios.create({ baseURL: 'https://sheets.googleapis.com' });

const googleCredentials = {
  client_email: 'VITE_GOOGLE_CREDENTIALS_CLIENT_EMAIL',
  private_key: 'VITE_GOOGLE_CREDENTIALS_PRIVATE_KEY',
  token_uri: 'VITE_GOOGLE_CREDENTIALS_TOKEN_URI',
};

export {
  axios, googleAuthApi, googleSheetsApi, googleCredentials,
};

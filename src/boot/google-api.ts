import axios from 'axios';

export interface GoogleCredentials {
  client_email: string;
  private_key: string;
  token_uri: string;
}

const googleAuthApi = axios.create({ baseURL: 'https://oauth2.googleapis.com' });
const googleSheetsApi = axios.create({ baseURL: 'https://sheets.googleapis.com' });

const googleCredentials:GoogleCredentials = {
  client_email: import.meta.env.VITE_GOOGLE_CREDENTIALS_CLIENT_EMAIL,
  private_key: import.meta.env.VITE_GOOGLE_CREDENTIALS_PRIVATE_KEY,
  token_uri: import.meta.env.VITE_GOOGLE_CREDENTIALS_TOKEN_URI,
};

export {
  axios, googleAuthApi, googleSheetsApi, googleCredentials,
};

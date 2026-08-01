import axios from 'axios';
import { TMDB_BASE_URL, TMDB_API_KEY, BACKEND_URL } from '@/config/constants';

/** TMDB API client */
export const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US',
  },
});

/** Backend API client */
export const backendClient = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** Inject auth token into backend requests */
export function setAuthToken(token: string | null) {
  if (token) {
    backendClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete backendClient.defaults.headers.common['Authorization'];
  }
}

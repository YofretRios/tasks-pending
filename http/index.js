import axios from 'axios';

export function getAuthorizationHeader(token) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export const http = axios.create({
  baseURL: 'https://rios-task-manager.herokuapp.com',
});

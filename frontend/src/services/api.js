import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const searchQuery = async ({ email, query }) => {
  return axios.post(`${API_URL}/search`, { email, query });
};

export const googleAuth = async (token) => {
  return axios.post(`${API_URL}/auth`, token );
}

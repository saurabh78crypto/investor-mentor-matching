import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const searchQuery = async ({ email, query }) => {
  return axios.post(`${API_URL}/search`, { email, query });
};

export const googleAuth = async (token) => {
  return axios.post(`${API_URL}/auth`, token );
}

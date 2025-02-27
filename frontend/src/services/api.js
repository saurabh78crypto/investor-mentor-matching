import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const searchQuery = async ({ email, query }) => {
   const res = await axios.post(`${API_URL}/search`, { email, query });
   return res.data;
};

export const googleAuth = async (token) => {
  const res = axios.post(`${API_URL}/auth`, token );
  return res.data;
}

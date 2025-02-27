import { googleAuth } from "../services/api";

// Get token from the Google response
export const getToken = (response) => response.credential;
  
// API call for authentication
export const getAuthToken = async (token) => {
    return await googleAuth({ token });
};





// Feteches the stored email from localStorage
export const getEmail = () => localStorage.getItem("userEmail");



// Handles errors and returns a formatted error message
export const processErrorResponse = (error) => {
    const message = error.response?.status === 400 && error.response.data?.message
                      ? error.response.data.message
                      : "An error occurred while searching. Please try again."
    
    return { response:"", userCredits: null, errorMessage: message };
  }
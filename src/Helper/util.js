export const normalizeError = (error) => {
  if (error.response) {
    // Request made and server responded
    const errorData = error.response.data;
    if (errorData.message) {
      return errorData.message;
    }
    if (errorData.errors) {
      return errorData.errors[0].msg;
    }
  } else if (error.request) {
    // The request was made but no response was received
    return "Server is not responding";
  } else {
    // Something happened in setting up the request that triggered an Error
    return "Something went wrong";
  }
};

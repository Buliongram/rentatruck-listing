
import axios from "axios";
import toast from "react-hot-toast";

const apiCall = async (
  endpoint,
  data,
  loadingMessage,
  successMessage,
  errorMessage,
  customConfig = {}
) => {
  const toastId = "123";
  try {
    const url =
      window.location.hostname === "localhost"
        ? `http://localhost:5000/api/auth/${endpoint}`
        : `https://cre8tiveforge-server.onrender.com/api/auth/${endpoint}`;

    const res = await axios.post(url, data, {
      ...customConfig,
      withCredentials: true,
    });
    const responseData = res.data;

    if (responseData.error) {
      toast.error(responseData.message, { id: toastId });
      return null;
    }
    toast.success(successMessage || responseData.message, { id: toastId });
    return responseData;
  } catch (error) {
    const defaultError = "An unexpected error occurred. Please try again.";
    const finalErrorMessage =
      errorMessage || error.response?.data?.message || defaultError;
    toast.error(finalErrorMessage, { id: toastId });
    return null;
  }
};

export default apiCall;

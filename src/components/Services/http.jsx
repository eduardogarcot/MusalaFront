import axios from "axios";
import { toast } from "react-toastify";


axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        toast.error("An unexpected error occured.");
    }

    return Promise.reject(error);
});
export const ENDPOINTS="https://localhost:5001/api/";






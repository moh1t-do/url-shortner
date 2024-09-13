import axios from "axios";

const SERVER_URL = process.env.SERVER_URL;
const axiosInstance = axios.create({
    baseURL: SERVER_URL
})

export { SERVER_URL };

export default axiosInstance
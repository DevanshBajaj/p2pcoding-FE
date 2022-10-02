import axios from "axios";
import {getJWT} from "./utils/Utils";

const AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {Authorization: `Bearer ${getJWT()}`}
});

export default AxiosInstance;

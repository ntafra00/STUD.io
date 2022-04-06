import axios from "axios";
import {baseRoute} from "../constants"


axios.defaults.withCredentials = true;

const API = axios.create({
    baseURL: baseRoute
})

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response.status === 401) {
            window.location.href = "http://localhost:3000"
        }
    }
)

export default API
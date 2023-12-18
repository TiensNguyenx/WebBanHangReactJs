import axios from "axios";
const request = axios.create({
    baseURL: "https://be-web-mn5x.onrender.com/api/",
});
export default request;
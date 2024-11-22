import axios from "axios";
const request = axios.create({
    baseURL: "https://be-pbl3-commerce-web.onrender.com/api/",
});
export default request;
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const jwt = cookies.get("jwt");

const baseURL = "http://localhost:8080";

const api = axios.create({
  baseURL,
  headers: {
    Authorization: "Bearer " + jwt
  }
});

export default api;

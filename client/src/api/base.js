import axios from "axios";

const VITE_SERVER_BASEURL = "http://localhost:3000/";

const token = localStorage.getItem("token");


const api = axios.create({
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    baseURL: VITE_SERVER_BASEURL,
});

export { api };
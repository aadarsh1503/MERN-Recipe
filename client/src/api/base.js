import axios from "axios";

const VITE_SERVER_BASEURL = "https://mern-recipe-6.onrender.com/";

const token = localStorage.getItem("token");


const api = axios.create({
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    baseURL: VITE_SERVER_BASEURL,
});

export { api };
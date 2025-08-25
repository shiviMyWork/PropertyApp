import axios from "axios";

const API = axios.create({ baseURL: "https://backend-t41o.onrender.com/api" }); // For Android Emulator use 10.0.2.2
// const API = axios.create({ baseURL: "http://10.0.2.2:5000/api" });

API.interceptors.request.use((req) => {
  const token = global.authToken;
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;

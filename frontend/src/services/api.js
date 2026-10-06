import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function signupUser(userData) {
  const response = await API.post("/auth/signup", userData);
  return response.data;
}

export async function loginUser(userData) {
  const response = await API.post("/auth/login", userData);
  return response.data;
}

export async function getHistory() {
  const response = await API.get("/voice/history");
  return response.data;
}

export async function sendVoiceText(text) {
  const response = await API.post("/voice/respond", { text });
  return response.data;
}

export default API;

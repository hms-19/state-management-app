import axios from "axios";

export const api = axios.create({
  baseURL: " https://www.balldontlie.io/api/v1",
  headers: { "X-Custom-Header": "State Management App" },
});

import axios from "axios";

export const api = axios.create({
  baseURL: " https://www.balldontlie.io/api/v1",
  timeout: 1000,
  headers: { "X-Custom-Header": "Codigo Testing" },
});

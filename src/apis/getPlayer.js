import { api } from "./index";
export const getPlayer = (page) => {
  return api.get(`/players?page=${page}&per_page=10`);
};

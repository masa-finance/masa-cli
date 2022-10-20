import axios from "axios";
import { config } from "./storage";

const headers = {
  "Content-Type": "application/json",
};

export const middlewareClient = axios.create({
  baseURL: config.get("api-url"),
  withCredentials: true,
  headers,
});

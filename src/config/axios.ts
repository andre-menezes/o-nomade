import { TIMEOUT } from "@/utils";
import axios from "axios";

const API = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: TIMEOUT,
});

export default API;

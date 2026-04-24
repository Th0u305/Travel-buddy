import axios from "axios";
import { envVars } from "@/src/config/env";

const axiosInstance = axios.create({
  baseURL: envVars.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials : true
});

export { axiosInstance }

import axios from "axios";
import { getServerUrl } from "./utils/getServerUrl.util";

const VITE_BASE_URL = getServerUrl();

const Api = axios.create({
  baseURL: VITE_BASE_URL,
  timeout: 5000,
  headers: {},
});

export default Api;

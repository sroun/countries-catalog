import axios from "axios"

const baseURL = import.meta.env.VITE_APP_BASE_URL

const http = axios.create({ baseURL })

export default http;
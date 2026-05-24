import axios from "axios";
const BASE = "http://localhost:8000";
export const analyzeUser = (handle) => axios.get(`${BASE}/analyze/${handle}`).then((r) => r.data);

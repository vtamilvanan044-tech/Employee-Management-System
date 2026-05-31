// src/api.js
import axios from 'axios';

const API = 'http://localhost:8080/api';

export const getPlayer = () => axios.get(`${API}/player`);
export const movePlayer = (dx, dy) => axios.post(`${API}/move?dx=${dx}&dy=${dy}`);
export const attack = () => axios.post(`${API}/attack`);

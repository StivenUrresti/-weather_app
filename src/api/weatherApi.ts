import axios from 'axios';
import {WeatherResponse} from './interface/weather.interface';

const API_KEY = 'a21a809bce473f14879b600dc2b7bbf2';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
  },
});

export const getWeatherByCity = async (city: string) => {
  try {
    const response = await api.get<WeatherResponse>('/', {
      params: {q: city},
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener el clima:', error);
    throw new Error('No se pudo obtener la información del clima');
  }
};

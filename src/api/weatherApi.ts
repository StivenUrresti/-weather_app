import axios, {AxiosError} from 'axios';
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
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{message: string}>;

      if (axiosError.response) {
        const {status, data} = axiosError.response;

        if (status === 404) {
          throw new Error(
            'Ciudad no encontrada. Verifica el nombre e intenta nuevamente.',
          );
        }

        throw new Error(data?.message || 'Error al obtener el clima.');
      }
    }
    throw new Error('Ocurrió un error inesperado. Intenta nuevamente.');
  }
};

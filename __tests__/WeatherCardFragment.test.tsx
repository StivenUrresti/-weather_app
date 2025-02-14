import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {WeatherResponse} from '../src/api/interface/weather.interface';
import {WeatherCardFragment} from '../src/screens/HomeScreen/fragments';

const mockWeatherData: WeatherResponse = {
  name: 'Bogotá',
  main: {
    temp: 293.15,
    feels_like: 290.15,
    humidity: 80,
    pressure: 1012,
    temp_min: 0,
    temp_max: 0,
  },
  weather: [
    {
      description: 'Nublado',
      icon: '04d',
      id: 0,
      main: '',
    },
  ],
  wind: {speed: 3, deg: 120},
  sys: {
    country: 'CO',
    sunset: Math.floor(Date.now() / 1000) + 3600,
    sunrise: 0,
  },
  clouds: {all: 50},
  coord: {
    lon: 0,
    lat: 0,
  },
  base: '',
  visibility: 0,
  dt: 0,
  timezone: 0,
  id: 0,
  cod: 0,
};

describe('WeatherCardFragment', () => {
  it('debe renderizar correctamente el nombre de la ciudad y la descripción del clima', () => {
    render(<WeatherCardFragment data={mockWeatherData} />);

    expect(screen.getByText(/Bogotá, CO/i)).toBeTruthy();
    expect(screen.getByText(/Nublado/i)).toBeTruthy();
  });

  it('debe mostrar las etiquetas de información meteorológica', () => {
    render(<WeatherCardFragment data={mockWeatherData} />);

    expect(screen.getByText(/Sensación térmica:/i)).toBeTruthy();
    expect(screen.getByText(/Humedad:/i)).toBeTruthy();
    expect(screen.getByText(/Viento:/i)).toBeTruthy();
    expect(screen.getByText(/Presión:/i)).toBeTruthy();
    expect(screen.getByText(/Nubosidad:/i)).toBeTruthy();
    expect(screen.getByText(/Atardecer:/i)).toBeTruthy();
  });
});

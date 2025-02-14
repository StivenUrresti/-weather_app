import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
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

jest.mock('react-native/Libraries/Animated/Animated', () => {
  const ActualAnimated = jest.requireActual(
    'react-native/Libraries/Animated/Animated',
  );
  return {
    ...ActualAnimated,
    timing: (value: any, config: any) => ({
      start: (callback?: () => void) => {
        value.setValue(config.toValue);
        callback && callback();
      },
    }),
  };
});

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

  it('debe mostrar la flecha al hacer scroll hacia arriba', () => {
    const {getByTestId} = render(
      <WeatherCardFragment data={mockWeatherData} />,
    );
    const scrollView = getByTestId('weather-scrollview');

    fireEvent.scroll(scrollView, {
      nativeEvent: {
        contentOffset: {y: 30},
        contentSize: {height: 500, width: 300},
        layoutMeasurement: {height: 100, width: 300},
      },
    });

    fireEvent.scroll(scrollView, {
      nativeEvent: {
        contentOffset: {y: 10},
        contentSize: {height: 500, width: 300},
        layoutMeasurement: {height: 100, width: 300},
      },
    });

    const arrow = getByTestId('down-arrow');
    expect(arrow.props.style.opacity).toBe(1);
  });
});

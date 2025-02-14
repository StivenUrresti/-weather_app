import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {HomeScreen} from '../src/screens';
import {useActions} from '../src/screens/HomeScreen/useActions';

jest.mock('../src/screens/HomeScreen/useActions', () => ({
  useActions: jest.fn(),
}));

describe('HomeScreen', () => {
  it('muestra un mensaje de error si hay un error en la búsqueda', async () => {
    (useActions as jest.Mock).mockReturnValue({
      control: {},
      errors: {},
      isDirty: true,
      isValid: true,
      weatherData: null,
      loading: false,
      erroMessage: 'Error al obtener el clima',
      fetchData: jest.fn(),
    });

    const {getByText} = render(<HomeScreen />);

    expect(getByText('Error al obtener el clima')).toBeTruthy();
  });

  it('muestra datos del clima cuando se obtienen correctamente', async () => {
    (useActions as jest.Mock).mockReturnValue({
      control: {},
      errors: {},
      isDirty: true,
      isValid: true,
      weatherData: {
        name: 'Bogotá',
        main: {temp: 20, feels_like: 18, humidity: 80, pressure: 1012},
        weather: [{description: 'Despejado', icon: '01d'}],
        wind: {speed: 3, deg: 120},
        sys: {country: 'CO'},
        clouds: {all: 50},
      },
      loading: false,
      erroMessage: null,
      fetchData: jest.fn(),
    });

    const {getByText} = render(<HomeScreen />);

    expect(getByText(/Bogotá/i)).toBeTruthy();
    expect(getByText(/Despejado/i)).toBeTruthy();
    expect(getByText(/CO/i)).toBeTruthy();
  });

  it('llama a `fetchData` cuando se presiona el botón', async () => {
    const fetchDataMock = jest.fn();
    (useActions as jest.Mock).mockReturnValue({
      control: {},
      errors: {},
      isDirty: true,
      isValid: true,
      weatherData: null,
      loading: false,
      erroMessage: null,
      fetchData: fetchDataMock,
    });

    const {getByText} = render(<HomeScreen />);
    const button = getByText('Buscar');

    fireEvent.press(button);

    await waitFor(() => {
      expect(fetchDataMock).toHaveBeenCalled();
    });
  });
});

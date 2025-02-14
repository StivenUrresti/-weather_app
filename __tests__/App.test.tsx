import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../src/App';

jest.useFakeTimers();

describe('App', () => {
  test('Muestra SplashScreen', async () => {
    const {getByText} = render(<App />);
    expect(getByText('Bienvenido a ClimaYa')).toBeTruthy();
  });
});

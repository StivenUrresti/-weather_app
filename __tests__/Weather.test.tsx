import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {getWeatherByCity} from '../src/api/weatherApi';

const mock = new MockAdapter(axios);

describe('getWeatherByCity', () => {
  afterEach(() => {
    mock.reset();
  });

  it('debe devolver los datos del clima si la ciudad existe', async () => {
    mock.onGet('/').reply(200, {
      name: 'Bogota',
      main: {temp: 20, feels_like: 18, humidity: 80, pressure: 1012},
      weather: [{description: 'muy nuboso', icon: '04d'}],
      wind: {speed: 3, deg: 120},
      sys: {country: 'CO'},
      clouds: {all: 75},
    });

    const data = await getWeatherByCity('Bogotá');

    expect(data).toEqual(
      expect.objectContaining({
        name: expect.stringContaining('Bogota'),
        weather: expect.arrayContaining([
          expect.objectContaining({description: 'muy nuboso'}),
        ]),
      }),
    );
  });

  it('debe lanzar un error si la ciudad no existe', async () => {
    mock.onGet('/').reply(404, {
      message: 'Ciudad no encontrada. Verifica el nombre.',
    });

    await expect(getWeatherByCity('CiudadInventada')).rejects.toThrow(
      'Ciudad no encontrada. Verifica el nombre.',
    );
  });
});

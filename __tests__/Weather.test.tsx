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
      weather: [{description: 'nubes dispersas'}],
      main: {
        temp: 290.88,
      },
    });

    const data = await getWeatherByCity('Bogotá');

    expect(data).toEqual(
      expect.objectContaining({
        name: 'Bogota',
        weather: expect.arrayContaining([
          expect.objectContaining({description: 'nubes dispersas'}),
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

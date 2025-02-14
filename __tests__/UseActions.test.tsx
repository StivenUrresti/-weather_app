import {renderHook, act} from '@testing-library/react-hooks';
import {useActions} from '../src/screens/HomeScreen/useActions';
import {getWeatherByCity} from '../src/api/weatherApi';

jest.mock('../src/api/weatherApi', () => ({
  getWeatherByCity: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    control: {},
    getValues: jest.fn(() => ({city: ''})),
    formState: {errors: {}, isDirty: false, isValid: false},
  })),
}));

describe('useActions hook', () => {
  it('debe inicializar correctamente los estados', () => {
    const {result} = renderHook(() => useActions());

    expect(result.current.weatherData).toBeUndefined();
    expect(result.current.loading).toBe(false);
    expect(result.current.erroMessage).toBe('');
    expect(result.current.isValid).toBe(false);
    expect(result.current.isDirty).toBe(false);
    expect(result.current.errors).toEqual({});
  });

  it('debe establecer un mensaje de error cuando la API devuelve "Ciudad no encontrada. Verifica el nombre."', async () => {
    const {result} = renderHook(() => useActions());

    (getWeatherByCity as jest.Mock).mockRejectedValue(
      new Error('Ciudad no encontrada. Verifica el nombre.'),
    );

    await act(async () => {
      await result.current.fetchData();
    });

    expect(result.current.erroMessage).toBe(
      'No se encontraron datos para la ciudad ingresada',
    );
  });

  it('debe establecer un mensaje de error cuando ocurre un error inesperado', async () => {
    const {result} = renderHook(() => useActions());

    (getWeatherByCity as jest.Mock).mockRejectedValue(
      new Error('Error al obtener los datos.'),
    );

    await act(async () => {
      await result.current.fetchData();
    });

    expect(result.current.erroMessage).toBe('Ocurrió un error inesperado');
  });
});

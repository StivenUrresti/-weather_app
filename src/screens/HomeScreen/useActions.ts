import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {getWeatherByCity} from '../../api/weatherApi';
import {useState} from 'react';
import {WeatherResponse} from '../../api/interface/weather.interface';

const schema = yup.object().shape({
  city: yup.string().required('debes ingresar una ciudad'),
});

export const useActions = () => {
  const [weatherData, setWeatherData] = useState<WeatherResponse>();
  const [loading, setLoading] = useState(false);
  const {
    control,
    getValues,
    formState: {errors, isDirty, isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      city: '',
    },
    resolver: yupResolver(schema),
  });

  const fetchData = async () => {
    const {city} = getValues();
    setLoading(true);
    try {
      const data = await getWeatherByCity(city);
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('@@@@@@@@@@@@error', error);
    }
  };

  return {control, errors, isDirty, isValid, weatherData, loading, fetchData};
};

import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  city: yup.string().required('City is required'),
});

export const useActions = () => {
  const {
    control,
    formState: {errors, isDirty, isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      city: '',
    },
    resolver: yupResolver(schema),
  });
  return {control, errors, isDirty, isValid};
};

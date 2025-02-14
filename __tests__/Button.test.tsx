import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Button} from '../src/components/Button';
import {View} from 'react-native';

describe('Button Component', () => {
  test('Se renderiza correctamente con el texto del label', () => {
    const {getByText} = render(<Button label="Enviar" />);
    expect(getByText('Enviar')).toBeTruthy();
  });

  test('Ejecuta onPress cuando se hace clic', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(<Button label="Click" onPress={onPressMock} />);

    fireEvent.press(getByText('Click'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test('No ejecuta onPress cuando está deshabilitado', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <Button label="No Click" onPress={onPressMock} disabled />,
    );

    fireEvent.press(getByText('No Click'));

    expect(onPressMock).not.toHaveBeenCalled();
  });

  test('Cambia el color de fondo cuando está deshabilitado', () => {
    const {getByTestId} = render(<Button label="Deshabilitado" disabled />);

    const button = getByTestId('button');

    expect(button).toHaveStyle({backgroundColor: '#F1F1F1'});
  });

  test('Muestra iconos correctamente a la izquierda y derecha', () => {
    const LeftIcon = <View testID="icon-left" />;
    const RightIcon = <View testID="icon-right" />;

    const {getByTestId} = render(
      <Button label="Con Iconos" iconLeft={LeftIcon} iconRight={RightIcon} />,
    );

    expect(getByTestId('icon-left')).toBeTruthy();
    expect(getByTestId('icon-right')).toBeTruthy();
  });
});

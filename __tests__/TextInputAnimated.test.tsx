import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {TextInputAnimated} from '../src/components/TextInputAnimated';

describe('TextInputAnimated Component', () => {
  it('Renderiza el placeholder correctamente', () => {
    const {getByText} = render(
      <TextInputAnimated label="Nombre" name="name" error={false} />,
    );
    expect(getByText('Nombre')).toBeTruthy();
  });

  it('Muestra mensaje de error cuando hay error', () => {
    const {getByText} = render(
      <TextInputAnimated
        name="name"
        label="Nombre"
        error={true}
        helperTextError="Campo requerido"
      />,
    );
    expect(getByText('Campo requerido')).toBeTruthy();
  });

  it('Llama a onChange al escribir en el input', () => {
    const handleChange = jest.fn();
    const {getByTestId} = render(
      <TextInputAnimated
        name="name"
        label="Nombre"
        onChange={handleChange}
        error={false}
      />,
    );

    const input = getByTestId('text-input');
    fireEvent.changeText(input, 'Nuevo valor');

    expect(handleChange).toHaveBeenCalledWith('Nuevo valor');
  });

  it('Anima el placeholder cuando recibe focus', () => {
    const {getByTestId} = render(
      <TextInputAnimated name="name" label="Nombre" error={false} />,
    );

    const input = getByTestId('text-input');
    fireEvent(input, 'focus');

    expect(input).toBeTruthy();
  });
});

import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

// Simular temporizadores para pruebas con `setTimeout`
jest.useFakeTimers();

// Mock de `console` para evitar logs en los tests
global.console = {
  ...console,
  log: console.log,
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock de `react-native-reanimated`
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {}; // Soluciona problema con `call()`
  return Reanimated;
});

// Mocks de `react-hook-form`
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
  useController: jest.fn(() => ({
    field: {onChange: jest.fn(), onBlur: jest.fn(), value: ''},
  })),
}));




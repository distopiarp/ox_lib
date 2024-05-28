import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  colors: {
    dark: [
      '#A6A7AB',
      '#909296',
      '#5C5F66',
      '#373A40',
      '#2C2E33',
      '#25262B',
      '#1A1B1E',
      '#141517',
      '#101113',
      '#000000',
    ],
    darkTransparent: [
      '#A6A7ABAA',
      '#909296AA',
      '#5C5F66AA',
      '#373A40AA',
      '#2C2E33AA',
      '#25262BAA',
      '#1A1B1EAA',
      '#141517AA',
      '#101113AA',
      '#000000AA',
    ],
  },
  fontFamily: 'Poppins',
  shadows: { sm: '1px 1px 3px rgba(0, 0, 0, 0.5)' },
  components: {
    Button: {
    },
  },
};

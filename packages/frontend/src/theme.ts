import { ThemeOptions } from '@material-ui/core';
import { blue, deepOrange, lightBlue } from '@material-ui/core/colors';

export const lightTheme: ThemeOptions = {
  palette: {
    primary: blue,
    secondary: blue,
    background: {
      default: '#f5f5f5',
    },
    type: 'light',
  },
  typography: {
    fontFamily: ['"Comic Neue"', 'Helvetica', 'sans-serif'].join(','),
    h5: {
      fontWeight: 700,
    },
  },
};

export const darkTheme: ThemeOptions = {
  palette: {
    primary: deepOrange,
    secondary: lightBlue,
    background: {
      default: '#212121',
    },
    type: 'dark',
  },
  typography: {
    fontFamily: ['"Comic Neue"', 'Helvetica', 'sans-serif'].join(','),
    h5: {
      fontWeight: 700,
    },
  },
};

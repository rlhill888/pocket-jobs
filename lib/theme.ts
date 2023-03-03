import { ThemeOptions } from '@mui/material/styles';
import {createTheme} from "@mui/material/styles"

export const themeOptions: ThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#096fe0',
    },
    secondary: {
      main: '#3df5a7',
    },
  },
});
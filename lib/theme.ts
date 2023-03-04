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

export const  darkenRGBValue = (rgbString: string)=> {
  // Check if the RGB string is valid
  if (!/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.test(rgbString)) {
    throw new Error('Invalid RGB string');
  }

  // Extract the existing RGB values
  const [_, r, g, b]:any = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

  // Replace the first RGB value with the new value
  const newRgbString = `rgb(${r*2}, ${g}, ${b})`;

  return newRgbString;
}

export const  lightenRGBValue = (rgbString: string)=> {
  // Check if the RGB string is valid
  if (!/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.test(rgbString)) {
    throw new Error('Invalid RGB string');
  }

  // Extract the existing RGB values
  const [_, r, g, b]:any = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

  // Replace the first RGB value with the new value
  const newRgbString = `rgb(${r/1.2}, ${g}, ${b})`;

  return newRgbString;
}

export const getFirstRGBValue= (rgbString: string) =>{
  // Extract the substring between the parentheses
  var rgbValues = rgbString.substring(rgbString.indexOf("(") + 1, rgbString.indexOf(")"));
  
  // Split the string by commas
  var rgbArray = rgbValues.split(",");
  
  // Parse the first value and return it
  return parseInt(rgbArray[0]);
}
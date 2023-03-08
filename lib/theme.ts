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
    tertiary: {
      main: '#FFFFFF' 
    } ,
    fourth: {
      main: '#000000'
    }
  } as any,
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

export const getFirstRGBNumber= (rgbString: string) =>{
  const startIndex = rgbString.indexOf("(") + 1;
  const endIndex = rgbString.indexOf(",");
  const redValue = parseInt(rgbString.substring(startIndex, endIndex));
  return redValue;
}
export const  convertColorToRGB= (colorString: string)=> {
  if (colorString.charAt(0) === '#') {
    // Convert hex color to RGB
    const hex = colorString.substring(1);
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  } else if (colorString.startsWith('rgb')) {
    // Remove 'rgb' and parentheses from RGB color string
    const rgb = colorString.substring(4, colorString.length - 1);
    // Split RGB values into an array
    const rgbValues = rgb.split(',').map(value => parseInt(value.trim()));
    return `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
  } else {
    // Invalid color string
    return 'rgb(255, 255, 255)';
  }
}


export const getFirstRGBValue= (initialString: string) =>{
  // Extract the substring between the parentheses

  let rgbString = convertColorToRGB(initialString)
  var rgbValues = rgbString.substring(rgbString.indexOf("(") + 1, rgbString.indexOf(")"));
  
  // Split the string by commas
  var rgbArray = rgbValues.split(",");
  
  // Parse the first value and return it
  return parseInt(rgbArray[0]);
}
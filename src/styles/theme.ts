import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    textSecondary: string;
    border: string;
    headerBg: string;
  }
}

export const lightTheme: DefaultTheme = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  background: '#FFFFFF',
  text: '#2D3436',
  textSecondary: '#636E72',
  border: '#DFE6E9',
  headerBg: '#FFFFFF'
};

export const darkTheme: DefaultTheme = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  background: '#2D3436',
  text: '#FFFFFF',
  textSecondary: '#B2BEC3',
  border: '#636E72',
  headerBg: '#1E272E'
}; 
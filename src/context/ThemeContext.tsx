import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

// Define theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  textSecondary: string;
  headerBg: string;
  border: string;
  inputBg?: string;
}

// Light and dark themes
const lightTheme: ThemeColors = {
  primary: '#e63946',
  secondary: '#f1a208',
  background: '#f8f9fa',
  text: '#212529',
  textSecondary: '#6c757d',
  headerBg: '#ffffff',
  border: '#dee2e6',
  inputBg: '#ffffff'
};

const darkTheme: ThemeColors = {
  primary: '#e63946',
  secondary: '#f1a208',
  background: '#212529',
  text: '#f8f9fa',
  textSecondary: '#adb5bd',
  headerBg: '#343a40',
  border: '#495057',
  inputBg: '#2b3035'
};

// Create context
interface ThemeContextType {
  theme: 'light' | 'dark';
  themeColors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  themeColors: lightTheme,
  toggleTheme: () => {}
});

// Create provider
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const themeColors = theme === 'light' ? lightTheme : darkTheme;
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, themeColors, toggleTheme }}>
      <StyledThemeProvider theme={themeColors}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Create hook for using the theme
export const useTheme = () => useContext(ThemeContext); 
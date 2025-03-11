import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import Header from './components/Header';
import Home from './components/Home';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Contact from './components/Contact';
import { translations, LanguageCode } from './i18n/translations';
import { CartProvider } from './context/CartContext';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
`;

interface MainContentProps {
  $isHome: boolean;
}

const MainContent = styled.main<MainContentProps>`
  margin: 0 auto;
  padding: ${({ $isHome }) => $isHome ? '0' : '20px'};
  width: ${({ $isHome }) => $isHome ? '100%' : 'auto'};
  max-width: ${({ $isHome }) => $isHome ? 'none' : '1200px'};
`;

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [currentPage, setCurrentPage] = useState<'home' | 'menu' | 'contact'>('home');

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CartProvider>
        <AppContainer>
          <Header 
            toggleTheme={toggleTheme} 
            setLanguage={setLanguage}
            isDarkTheme={isDarkTheme}
            language={language}
            translations={translations[language]}
            onNavigate={setCurrentPage}
            currentPage={currentPage}
          />
          <MainContent $isHome={currentPage === 'home'}>
            {currentPage === 'home' && (
              <Home 
                onNavigate={setCurrentPage}
                translations={translations[language]}
              />
            )}
            {currentPage === 'menu' && (
              <>
                <Menu translations={translations[language]} />
                <Cart />
              </>
            )}
            {currentPage === 'contact' && <Contact />}
          </MainContent>
        </AppContainer>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;

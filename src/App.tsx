import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Home from './components/Home';
import Menu from './components/Menu';
import Contact from './components/Contact';
import Footer from './components/Footer';
import translations, { LanguageCode } from './i18n/translations';
import styled from 'styled-components';
import { useTheme } from './context/ThemeContext';
import Feedback from './components/Feedback';
import CartSidebar from './components/CartSidebar';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const MainContent = styled.main<{ isHomePage: boolean }>`
  flex: 1;
  padding: ${({ isHomePage }) => isHomePage ? '0' : '2rem'};
  max-width: ${({ isHomePage }) => isHomePage ? '100%' : '1200px'};
  margin: ${({ isHomePage }) => isHomePage ? '0' : '0 auto'};
  width: 100%;
`;

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'menu' | 'contact'>('home');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  const currentTranslations = translations[language];
  
  const handleNavigate = (page: 'home' | 'menu' | 'contact') => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const navigateToMenu = () => {
    handleNavigate('menu');
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  // Apply theme to body element
  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#212529' : '#f8f9fa';
    document.body.style.color = theme === 'dark' ? '#f8f9fa' : '#212529';
  }, [theme]);
  
  return (
    <CartProvider>
      <AppContainer>
        <Header 
          toggleTheme={toggleTheme}
          setLanguage={setLanguage}
          isDarkTheme={theme === 'dark'}
          language={language}
          translations={currentTranslations}
          onNavigate={handleNavigate}
          currentPage={currentPage}
          onCartClick={toggleCart}
        />
        
        <MainContent isHomePage={currentPage === 'home'}>
          {currentPage === 'home' && (
            <>
              <Home 
                translations={currentTranslations.home} 
                onNavigateToMenu={navigateToMenu}
              />
              <Feedback />
            </>
          )}
          {currentPage === 'menu' && <Menu translations={currentTranslations.menu} />}
          {currentPage === 'contact' && <Contact translations={currentTranslations.contact} />}
        </MainContent>
        
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <Footer translations={currentTranslations.footer} />
      </AppContainer>
    </CartProvider>
  );
};

const AppWithTheme: React.FC = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default AppWithTheme;

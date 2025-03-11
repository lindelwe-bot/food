import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { LanguageCode, languageNames } from '../i18n/translations';
import { useCart } from '../context/CartContext';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.headerBg};
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.primary};
  margin: 0;
  font-size: 1.8rem;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

interface ButtonProps {
  active?: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: ${({ theme, active }) => active ? theme.secondary : theme.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const CartCount = styled.span`
  background-color: ${({ theme }) => theme.secondary};
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const LanguageContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const LanguageButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LanguageDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: ${({ theme }) => theme.headerBg};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 4px;
  }
`;

const LanguageOption = styled.button<{ isSelected?: boolean }>`
  width: 100%;
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: ${({ theme, isSelected }) => isSelected ? theme.primary + '20' : 'transparent'};
  color: ${({ theme }) => theme.text};
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: ${({ theme }) => theme.primary + '40'};
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background-color: ${({ theme }) => theme.headerBg};
    padding: 5rem 1rem 1rem;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    z-index: 1000;
    overflow-y: auto;
  }
`;

const MobileMenuItem = styled(Button)`
  width: 100%;
  margin-bottom: 1rem;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

interface HeaderProps {
  toggleTheme: () => void;
  setLanguage: (lang: LanguageCode) => void;
  isDarkTheme: boolean;
  language: LanguageCode;
  translations: {
    header: {
      title: string;
      theme: string;
      language: string;
    };
  };
  onNavigate: (page: 'home' | 'menu' | 'contact') => void;
  currentPage: 'home' | 'menu' | 'contact';
}

const Header: React.FC<HeaderProps> = ({
  toggleTheme,
  setLanguage,
  isDarkTheme,
  language,
  translations,
  onNavigate,
  currentPage
}) => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const { items } = useCart();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleMobileMenuClick = (action: () => void) => {
    action();
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Title onClick={() => onNavigate('home')}>{translations.header.title}</Title>
        <ButtonGroup>
          <Button 
            active={currentPage === 'home'} 
            onClick={() => onNavigate('home')}
          >
            Home
          </Button>
          <Button 
            active={currentPage === 'menu'} 
            onClick={() => onNavigate('menu')}
          >
            Menu {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
          </Button>
          <Button 
            active={currentPage === 'contact'} 
            onClick={() => onNavigate('contact')}
          >
            Contact
          </Button>
          <Button onClick={toggleTheme}>
            {translations.header.theme} ({isDarkTheme ? '🌙' : '☀️'})
          </Button>
          <LanguageContainer ref={languageRef}>
            <LanguageButton onClick={() => setIsLanguageOpen(!isLanguageOpen)}>
              {languageNames[language]} 🌐
            </LanguageButton>
            <LanguageDropdown isOpen={isLanguageOpen}>
              {Object.entries(languageNames).map(([code, name]) => (
                <LanguageOption
                  key={code}
                  isSelected={code === language}
                  onClick={() => {
                    setLanguage(code as LanguageCode);
                    setIsLanguageOpen(false);
                  }}
                >
                  {name}
                  {code === language && ' ✓'}
                </LanguageOption>
              ))}
            </LanguageDropdown>
          </LanguageContainer>
        </ButtonGroup>
        <HamburgerButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </HamburgerButton>
        <Overlay isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(false)} />
        <MobileMenu isOpen={isMobileMenuOpen}>
          <MobileMenuItem 
            active={currentPage === 'home'}
            onClick={() => handleMobileMenuClick(() => onNavigate('home'))}
          >
            Home
          </MobileMenuItem>
          <MobileMenuItem 
            active={currentPage === 'menu'}
            onClick={() => handleMobileMenuClick(() => onNavigate('menu'))}
          >
            Menu
            {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
          </MobileMenuItem>
          <MobileMenuItem 
            active={currentPage === 'contact'}
            onClick={() => handleMobileMenuClick(() => onNavigate('contact'))}
          >
            Contact
          </MobileMenuItem>
          <MobileMenuItem onClick={() => handleMobileMenuClick(toggleTheme)}>
            {translations.header.theme} ({isDarkTheme ? '🌙' : '☀️'})
          </MobileMenuItem>
          <MobileMenuItem onClick={() => setIsLanguageOpen(!isLanguageOpen)}>
            {translations.header.language} 🌐
          </MobileMenuItem>
          {isLanguageOpen && (
            Object.entries(languageNames).map(([code, name]) => (
              <MobileMenuItem
                key={code}
                isSelected={code === language}
                onClick={() => {
                  setLanguage(code as LanguageCode);
                  setIsLanguageOpen(false);
                  setIsMobileMenuOpen(false);
                }}
              >
                {name}
                {code === language && ' ✓'}
              </MobileMenuItem>
            ))
          )}
        </MobileMenu>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 
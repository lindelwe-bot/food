import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { LanguageCode, languageNames } from '../i18n/translations';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

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

interface LanguageOptionProps {
  isSelected?: boolean;
}

const LanguageOption = styled.button<LanguageOptionProps>`
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

interface MobileMenuItemProps extends ButtonProps {
  isSelected?: boolean;
}

const MobileMenuItem = styled(Button)<MobileMenuItemProps>`
  width: 100%;
  margin-bottom: 1rem;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme, isSelected }) => 
    isSelected ? theme.primary + '20' : (props => props.active ? theme.secondary : theme.primary)};
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

const BookingButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 1rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.headerBg};
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  position: relative;
  z-index: 1001;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  
  /* Adding these styles to ensure modal stays within viewport */
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.primary};
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const BookingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputBg || theme.background};
  color: ${({ theme }) => theme.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  margin-bottom: 0.5rem;
  background-color: ${({ theme }) => theme.inputBg || theme.background};
  color: ${({ theme }) => theme.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputBg || theme.background};
  color: ${({ theme }) => theme.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputBg || theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const LanguageList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  
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

const LanguageCategory = styled.div`
  padding: 0.5rem 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  font-size: 0.9rem;
  background-color: ${({ theme }) => theme.background}10;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const CartButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
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
    booking: {
      title: string;
      name: string;
      email: string;
      phone: string;
      date: string;
      time: string;
      guests: string;
      specialRequests: string;
      submit: string;
      buttonText: string;
    };
  };
  onNavigate: (page: 'home' | 'menu' | 'contact') => void;
  currentPage: 'home' | 'menu' | 'contact';
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  toggleTheme,
  setLanguage,
  isDarkTheme,
  language,
  translations,
  onNavigate,
  currentPage,
  onCartClick
}) => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const languageRef = useRef<HTMLDivElement>(null);
  const { items } = useCart();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const { theme } = useTheme();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

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

  // Filter languages based on search query
  const filteredLanguages = Object.entries(languageNames).filter(([_, name]) => 
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate Zimbabwe languages from others
  const zimbabweLanguages = ['en', 'sn', 'nd', 'tn', 'ny', 've', 'ts', 'kck', 'xh'];
  
  const filteredZimbabweLanguages = filteredLanguages.filter(([code]) => 
    zimbabweLanguages.includes(code)
  );
  
  const filteredOtherLanguages = filteredLanguages.filter(([code]) => 
    !zimbabweLanguages.includes(code)
  );

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
            Menu
          </Button>
          <Button 
            active={currentPage === 'contact'} 
            onClick={() => onNavigate('contact')}
          >
            Contact
          </Button>
          <CartButton onClick={onCartClick}>
            🛒 Cart {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
          </CartButton>
          <Button onClick={toggleTheme}>
            {translations.header.theme} ({isDarkTheme ? '🌙' : '☀️'})
          </Button>
          <LanguageContainer ref={languageRef}>
            <LanguageButton onClick={() => setIsLanguageOpen(!isLanguageOpen)}>
              {languageNames[language]} 🌐
            </LanguageButton>
            <LanguageDropdown isOpen={isLanguageOpen}>
              <SearchInput 
                type="text" 
                placeholder="Search language..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              <LanguageList>
                {searchQuery === '' && (
                  <LanguageCategory>Zimbabwe Languages</LanguageCategory>
                )}
                {filteredZimbabweLanguages.map(([code, name]) => (
                  <LanguageOption
                    key={code}
                    isSelected={code === language}
                    onClick={() => {
                      setLanguage(code as LanguageCode);
                      setIsLanguageOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    {name}
                    {code === language && ' ✓'}
                  </LanguageOption>
                ))}

                {searchQuery === '' && filteredOtherLanguages.length > 0 && (
                  <LanguageCategory>Other Languages</LanguageCategory>
                )}
                {filteredOtherLanguages.map(([code, name]) => (
                  <LanguageOption
                    key={code}
                    isSelected={code === language}
                    onClick={() => {
                      setLanguage(code as LanguageCode);
                      setIsLanguageOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    {name}
                    {code === language && ' ✓'}
                  </LanguageOption>
                ))}
              </LanguageList>
            </LanguageDropdown>
          </LanguageContainer>
          <BookingButton onClick={() => setIsBookingModalOpen(true)}>
            {translations.booking.buttonText}
          </BookingButton>
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
            <>
              <SearchInput 
                type="text" 
                placeholder="Search language..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              {searchQuery === '' && <LanguageCategory>Zimbabwe Languages</LanguageCategory>}
              {filteredZimbabweLanguages.map(([code, name]) => (
                <MobileMenuItem
                  key={code}
                  isSelected={code === language}
                  onClick={() => {
                    setLanguage(code as LanguageCode);
                    setIsLanguageOpen(false);
                    setSearchQuery('');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {name}
                  {code === language && ' ✓'}
                </MobileMenuItem>
              ))}
              
              {searchQuery === '' && <LanguageCategory>Other Languages</LanguageCategory>}
              {filteredOtherLanguages.map(([code, name]) => (
                <MobileMenuItem
                  key={code}
                  isSelected={code === language}
                  onClick={() => {
                    setLanguage(code as LanguageCode);
                    setIsLanguageOpen(false);
                    setSearchQuery('');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {name}
                  {code === language && ' ✓'}
                </MobileMenuItem>
              ))}
            </>
          )}
          <MobileMenuItem onClick={() => {
            setIsBookingModalOpen(true);
            setIsMobileMenuOpen(false);
          }}>
            {translations.booking.buttonText}
          </MobileMenuItem>
        </MobileMenu>
      </HeaderContent>
      
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        translations={translations}
      />
    </HeaderContainer>
  );
};

const BookingModal = ({ isOpen, onClose, translations }: { 
  isOpen: boolean; 
  onClose: () => void;
  translations: any;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the booking data to your backend
    console.log('Booking submitted:', formData);
    alert('Booking request submitted! We will contact you to confirm.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>{translations.booking.title}</ModalTitle>
        
        <BookingForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">{translations.booking.name}</Label>
            <Input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">{translations.booking.email}</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="phone">{translations.booking.phone}</Label>
            <Input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="date">{translations.booking.date}</Label>
            <Input 
              type="date" 
              id="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="time">{translations.booking.time}</Label>
            <Input 
              type="time" 
              id="time" 
              name="time" 
              value={formData.time} 
              onChange={handleChange} 
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="guests">{translations.booking.guests}</Label>
            <Select 
              id="guests" 
              name="guests" 
              value={formData.guests} 
              onChange={handleChange} 
              required
              aria-label={translations.booking.guests}
              title={translations.booking.guests}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="specialRequests">{translations.booking.specialRequests}</Label>
            <TextArea 
              id="specialRequests" 
              name="specialRequests" 
              value={formData.specialRequests} 
              onChange={handleChange} 
            />
          </FormGroup>
          
          <SubmitButton type="submit">
            {translations.booking.submit}
          </SubmitButton>
        </BookingForm>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Header; 
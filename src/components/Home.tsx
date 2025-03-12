import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const HeroSection = styled.section`
  height: 80vh;
  background-image: url('https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: 0 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
    transform: translateY(-3px);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

interface HomeProps {
  translations: {
    title: string;
    subtitle: string;
    cta: string;
  };
  onNavigateToMenu: () => void;
}

const Home: React.FC<HomeProps> = ({ translations, onNavigateToMenu }) => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <Title>{translations.title}</Title>
          <Subtitle>{translations.subtitle}</Subtitle>
          <CTAButton onClick={onNavigateToMenu}>
            {translations.cta}
          </CTAButton>
        </HeroContent>
      </HeroSection>
    </HomeContainer>
  );
};

export default Home; 
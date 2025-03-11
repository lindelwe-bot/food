import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HomeContainer = styled.div`
  min-height: calc(100vh - 80px);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  filter: brightness(0.4);
  z-index: -1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.5)
    );
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  animation: ${fadeIn} 1s ease-out;
`;

const Title = styled.h1`
  font-size: 4.5rem;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: 800;
  letter-spacing: -1px;
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.8rem;
  color: white;
  margin-bottom: 2.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const CTAButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 1.2rem 3rem;
  font-size: 1.3rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-3px);
    background-color: ${({ theme }) => theme.secondary};
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
  }
`;

const OverlayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12rem;
  color: rgba(255, 255, 255, 0.05);
  font-weight: 900;
  white-space: nowrap;
  pointer-events: none;
  letter-spacing: -5px;
  
  @media (max-width: 768px) {
    font-size: 5rem;
    letter-spacing: -2px;
  }
`;

const Features = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 3rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Feature = styled.div`
  color: white;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
  animation-delay: 0.3s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureText = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
`;

interface HomeProps {
  onNavigate: (page: string) => void;
  translations: {
    menu: {
      title: string;
    };
    home: {
      welcome: string;
      subtitle: string;
      features: {
        fresh: string;
        delivery: string;
        quality: string;
      };
    };
  };
}

const Home: React.FC<HomeProps> = ({ onNavigate, translations }) => {
  return (
    <HomeContainer>
      <BackgroundImage />
      <OverlayText>Y0's FAST FOODS</OverlayText>
      <Content>
        <Title>{translations.home.welcome}</Title>
        <Subtitle>{translations.home.subtitle}</Subtitle>
        <CTAButton onClick={() => onNavigate('menu')}>
          {translations.menu.title}
        </CTAButton>
        <Features>
          <Feature>
            <FeatureIcon>🍟</FeatureIcon>
            <FeatureText>{translations.home.features.fresh}</FeatureText>
          </Feature>
          <Feature>
            <FeatureIcon>🚚</FeatureIcon>
            <FeatureText>{translations.home.features.delivery}</FeatureText>
          </Feature>
          <Feature>
            <FeatureIcon>⭐</FeatureIcon>
            <FeatureText>{translations.home.features.quality}</FeatureText>
          </Feature>
        </Features>
      </Content>
    </HomeContainer>
  );
};

export default Home; 
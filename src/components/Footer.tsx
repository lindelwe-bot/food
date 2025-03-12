import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 3rem 1rem 1rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  margin-bottom: 2rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 0.8;
  }
`;

const FooterText = styled.p`
  margin-bottom: 0.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.9rem;
`;

interface FooterProps {
  translations: {
    about?: string;
    quickLinks?: string;
    contact?: string;
    hours?: string;
    copyright?: string;
  };
}

const Footer: React.FC<FooterProps> = ({ translations = {} }) => {
  const {
    about = 'About Us',
    quickLinks = 'Quick Links',
    contact = 'Contact',
    hours = 'Opening Hours',
    copyright = '© 2023 Y0\'s Fast Foods. All rights reserved.'
  } = translations;
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <FooterTitle>{about}</FooterTitle>
            <FooterText>
              Y0's Fast Foods offers delicious meals made with the freshest ingredients.
              Our mission is to provide quality food with fast and friendly service.
            </FooterText>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>{quickLinks}</FooterTitle>
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Menu</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
            <FooterLink href="#">Book a Table</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>{contact}</FooterTitle>
            <FooterText>123 Food Street, Bulawayo, Zimbabwe</FooterText>
            <FooterText>+263 784 262 096</FooterText>
            <FooterText>info@y0fastfoods.com</FooterText>
            <SocialLinks>
              <SocialIcon href="#" aria-label="Facebook">📱</SocialIcon>
              <SocialIcon href="#" aria-label="Twitter">📱</SocialIcon>
              <SocialIcon href="#" aria-label="Instagram">📱</SocialIcon>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>{hours}</FooterTitle>
            <FooterText><strong>Monday - Friday:</strong> 8:00 AM - 10:00 PM</FooterText>
            <FooterText><strong>Saturday - Sunday:</strong> 9:00 AM - 11:00 PM</FooterText>
          </FooterSection>
        </FooterGrid>
        
        <Copyright>
          {copyright}
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 
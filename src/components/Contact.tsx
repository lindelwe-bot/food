import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text};
  margin-bottom: 2rem;
  text-align: center;
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const InfoCard = styled.div`
  background-color: ${({ theme }) => theme.background};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Icon = styled.span`
  font-size: 2rem;
  margin-bottom: 1rem;
  display: block;
`;

const InfoTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.textSecondary};
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const Contact: React.FC = () => {
  return (
    <ContactContainer>
      <Title>Contact Us</Title>
      <ContactInfo>
        <InfoCard>
          <Icon>📍</Icon>
          <InfoTitle>Address</InfoTitle>
          <InfoText>123 Emganwini, Bulawayo, Zimbabwe</InfoText>
        </InfoCard>
        <InfoCard>
          <Icon>📞</Icon>
          <InfoTitle>Phone</InfoTitle>
          <InfoText>+263 78 426 2096</InfoText>
        </InfoCard>
        <InfoCard>
          <Icon>✉️</Icon>
          <InfoTitle>Email</InfoTitle>
          <InfoText>info@y0fastfoods.com</InfoText>
        </InfoCard>
      </ContactInfo>
      <MapContainer>
        <StyledIframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15150.031811543275!2d28.538844!3d-20.208889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1eb5549f6abf7d27%3A0x6b3b8f6c2e83f8c5!2sEmganwini%2C%20Bulawayo%2C%20Zimbabwe!5e0!3m2!1sen!2s!4v1647789012345!5m2!1sen!2s"
          title="Y0's Fast Foods Location"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </MapContainer>
    </ContactContainer>
  );
};

export default Contact; 
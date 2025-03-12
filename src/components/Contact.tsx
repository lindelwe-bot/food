import React from 'react';
import styled from 'styled-components';

const ContactSection = styled.section`
  padding: 2rem 0;
`;

const ContactTitle = styled.h2`
  color: ${({ theme }) => theme.primary};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  background-color: ${({ theme }) => theme.headerBg};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h3`
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  margin-bottom: 1.5rem;
`;

const InfoLabel = styled.h4`
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.textSecondary};
`;

const ContactForm = styled.form`
  background-color: ${({ theme }) => theme.headerBg};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h3`
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  width: 100%;
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
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputBg || theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 150px;
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
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

interface ContactProps {
  translations: {
    title: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    weekdays: string;
    weekends: string;
    weekdayHours: string;
    weekendHours: string;
    sendMessage: string;
    yourName: string;
    yourEmail: string;
    yourMessage: string;
    send: string;
  };
}

const Contact: React.FC<ContactProps> = ({ translations }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Message sent! We will get back to you soon.');
  };
  
  return (
    <ContactSection>
      <ContactTitle>{translations.title}</ContactTitle>
      
      <ContactGrid>
        <ContactInfo>
          <InfoTitle>Y0's Fast Foods</InfoTitle>
          
          <InfoItem>
            <InfoLabel>{translations.address}</InfoLabel>
            <InfoText>123 Food Street, Bulawayo, Zimbabwe</InfoText>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>{translations.phone}</InfoLabel>
            <InfoText>+263 784 262 096</InfoText>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>{translations.email}</InfoLabel>
            <InfoText>info@y0fastfoods.com</InfoText>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>{translations.hours}</InfoLabel>
            <InfoText>
              <strong>{translations.weekdays}:</strong> {translations.weekdayHours}<br />
              <strong>{translations.weekends}:</strong> {translations.weekendHours}
            </InfoText>
          </InfoItem>
        </ContactInfo>
        
        <ContactForm onSubmit={handleSubmit}>
          <FormTitle>{translations.sendMessage}</FormTitle>
          
          <FormGroup>
            <Label htmlFor="name">{translations.yourName}</Label>
            <Input type="text" id="name" required />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">{translations.yourEmail}</Label>
            <Input type="email" id="email" required />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">{translations.yourMessage}</Label>
            <TextArea id="message" required />
          </FormGroup>
          
          <SubmitButton type="submit">{translations.send}</SubmitButton>
        </ContactForm>
      </ContactGrid>
    </ContactSection>
  );
};

export default Contact; 
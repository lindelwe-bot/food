import React, { useState } from 'react';
import styled from 'styled-components';
// import { CreditCard, Smartphone, Wallet, X, DollarSign } from 'lucide-react';

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
  background-color: ${({ theme }) => theme.background};
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const PaymentOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const PaymentOption = styled.button<{ $selected?: boolean }>`
  padding: 1rem;
  border: 2px solid ${({ theme, $selected }) => $selected ? theme.primary : theme.border};
  border-radius: 8px;
  background-color: ${({ theme, $selected }) => $selected ? `${theme.primary}20` : 'transparent'};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => `${theme.primary}10`};
  }
`;

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme, $primary }) => $primary ? theme.primary : theme.border};
  color: ${({ theme, $primary }) => $primary ? '#fff' : theme.text};
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`;

const ExpiryContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const TotalAmount = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onPaymentComplete: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  total,
  onPaymentComplete
}) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPaymentComplete();
    onClose();
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'ecocash':
      case 'onemoney':
        return (
          <PaymentForm onSubmit={handleSubmit}>
            <Input
              type="tel"
              placeholder="Enter phone number"
              pattern="[0-9]{10}"
              required
            />
            <ButtonGroup>
              <Button onClick={onClose}>
                ✖️ Cancel
              </Button>
              <Button type="submit" $primary>
                💲 Pay ${total.toFixed(2)}
              </Button>
            </ButtonGroup>
          </PaymentForm>
        );
      case 'visa':
      case 'omari':
        return (
          <PaymentForm onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Card Number"
              pattern="[0-9]{16}"
              required
              value={paymentDetails.number}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, number: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Cardholder Name"
              required
              value={paymentDetails.name}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
            />
            <ExpiryContainer>
              <Input
                type="text"
                placeholder="MM/YY"
                pattern="[0-9]{2}/[0-9]{2}"
                required
                value={paymentDetails.expiry}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
              />
              <Input
                type="text"
                placeholder="CVV"
                pattern="[0-9]{3,4}"
                required
                value={paymentDetails.cvv}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
              />
            </ExpiryContainer>
            <ButtonGroup>
              <Button onClick={onClose}>
                ✖️ Cancel
              </Button>
              <Button type="submit" $primary>
                💲 Pay ${total.toFixed(2)}
              </Button>
            </ButtonGroup>
          </PaymentForm>
        );
      default:
        return null;
    }
  };

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContent>
        <CloseButton onClick={onClose}>
          ✖️
        </CloseButton>
        <Title>Select Payment Method</Title>
        
        <TotalAmount>
          💲 ${total.toFixed(2)}
        </TotalAmount>
        
        <PaymentOptions>
          <PaymentOption
            onClick={() => setSelectedMethod('ecocash')}
            $selected={selectedMethod === 'ecocash'}
          >
            📱 EcoCash
          </PaymentOption>
          <PaymentOption
            onClick={() => setSelectedMethod('onemoney')}
            $selected={selectedMethod === 'onemoney'}
          >
            💰 OneMoney
          </PaymentOption>
          <PaymentOption
            onClick={() => setSelectedMethod('omari')}
            $selected={selectedMethod === 'omari'}
          >
            💳 Omari Card
          </PaymentOption>
          <PaymentOption
            onClick={() => setSelectedMethod('visa')}
            $selected={selectedMethod === 'visa'}
          >
            💳 Visa Card
          </PaymentOption>
        </PaymentOptions>
        {renderPaymentForm()}
      </ModalContent>
    </ModalOverlay>
  );
};

export default PaymentModal; 
import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-400px')};
  width: 400px;
  height: 100vh;
  background-color: ${({ theme }) => theme.headerBg};
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto;

  @media (max-width: 480px) {
    width: 100%;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  }
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const CartTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  margin: 0;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const CartItems = styled.div`
  margin-bottom: 2rem;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  color: ${({ theme }) => theme.text};
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;

const ItemPrice = styled.p`
  color: ${({ theme }) => theme.primary};
  margin: 0;
  font-weight: bold;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const Quantity = styled.span`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

const CartTotal = styled.div`
  margin-top: auto;
  padding-top: 2rem;
  border-top: 2px solid ${({ theme }) => theme.border};
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
`;

const TotalAmount = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  font-size: 1.3rem;
`;

const CheckoutButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  width: 100%;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  padding: 2rem 0;
`;

const PaymentMethodModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const PaymentMethodContent = styled.div`
  background-color: ${({ theme }) => theme.headerBg};
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`;

const PaymentMethodTitle = styled.h2`
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const PaymentOptions = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const PaymentOption = styled.button<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme, selected }) => selected ? `${theme.primary}20` : theme.background};
  border: 2px solid ${({ theme, selected }) => selected ? theme.primary : theme.border};
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => `${theme.primary}10`};
  }
`;

const PaymentIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const PaymentInfo = styled.div`
  text-align: left;
  flex: 1;
`;

const PaymentName = styled.h3`
  color: ${({ theme }) => theme.text};
  margin: 0;
  font-size: 1.1rem;
`;

const PaymentDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin: 0.25rem 0 0 0;
  font-size: 0.9rem;
`;

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const PaymentInput = styled.input`
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const PaymentButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { items, addItem, removeItem, updateQuantity } = useCart();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const paymentMethods = [
    {
      id: 'ecocash',
      name: 'EcoCash',
      icon: '📱',
      description: 'Pay with EcoCash mobile money'
    },
    {
      id: 'onemoney',
      name: 'OneMoney',
      icon: '💰',
      description: 'Pay with OneMoney mobile wallet'
    },
    {
      id: 'telecash',
      name: 'Telecash',
      icon: '🏦',
      description: 'Pay with Telecash mobile money'
    },
    {
      id: 'zipit',
      name: 'ZIPIT',
      icon: '🏧',
      description: 'Bank to bank instant transfer'
    },
    {
      id: 'swipe',
      name: 'Card Payment',
      icon: '💳',
      description: 'Pay with your bank card'
    },
    {
      id: 'cash',
      name: 'Cash on Delivery',
      icon: '💵',
      description: 'Pay when your order arrives'
    }
  ];

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically process the payment
    alert(`Payment processing with ${selectedPayment}!\nPhone number: ${phoneNumber}\nAmount: $${total.toFixed(2)}`);
    setIsPaymentModalOpen(false);
    onClose();
  };

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <CartHeader>
          <CartTitle>Your Cart</CartTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </CartHeader>

        <CartItems>
          {items.length === 0 ? (
            <EmptyCart>Your cart is empty</EmptyCart>
          ) : (
            items.map((item) => (
              <CartItem key={item.id}>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
                </ItemInfo>
                <QuantityControls>
                  <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    -
                  </QuantityButton>
                  <Quantity>{item.quantity}</Quantity>
                  <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </QuantityButton>
                </QuantityControls>
              </CartItem>
            ))
          )}
        </CartItems>

        {items.length > 0 && (
          <CartTotal>
            <TotalRow>
              <span>Total</span>
              <TotalAmount>${total.toFixed(2)}</TotalAmount>
            </TotalRow>
            <CheckoutButton onClick={() => setIsPaymentModalOpen(true)}>
              Proceed to Checkout
            </CheckoutButton>
          </CartTotal>
        )}
      </SidebarContainer>

      {isPaymentModalOpen && (
        <PaymentMethodModal onClick={() => setIsPaymentModalOpen(false)}>
          <PaymentMethodContent onClick={e => e.stopPropagation()}>
            <PaymentMethodTitle>Select Payment Method</PaymentMethodTitle>
            <PaymentOptions>
              {paymentMethods.map(method => (
                <PaymentOption
                  key={method.id}
                  selected={selectedPayment === method.id}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <PaymentIcon>{method.icon}</PaymentIcon>
                  <PaymentInfo>
                    <PaymentName>{method.name}</PaymentName>
                    <PaymentDescription>{method.description}</PaymentDescription>
                  </PaymentInfo>
                </PaymentOption>
              ))}
            </PaymentOptions>

            {selectedPayment && selectedPayment !== 'cash' && (
              <PaymentForm onSubmit={handlePaymentSubmit}>
                <PaymentInput
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <PaymentButton type="submit">
                  Pay ${total.toFixed(2)}
                </PaymentButton>
              </PaymentForm>
            )}

            {selectedPayment === 'cash' && (
              <PaymentButton onClick={handlePaymentSubmit}>
                Confirm Cash on Delivery
              </PaymentButton>
            )}
          </PaymentMethodContent>
        </PaymentMethodModal>
      )}
    </>
  );
};

export default CartSidebar; 
import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import PaymentModal from './PaymentModal';
// import { ShoppingCart, Plus, Minus, CreditCard, X } from 'lucide-react';

const CartContainer = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  max-width: 400px;
  z-index: 100;
`;

const CartTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartItems = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.span`
  color: ${({ theme }) => theme.text};
  display: block;
  font-weight: 500;
`;

const ItemPrice = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
`;

const QuantityButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.9;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 1.5rem;
  text-align: center;
`;

const Total = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid ${({ theme }) => theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const CheckoutButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  width: 100%;
  margin-top: 1rem;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

const EmptyCartMessage = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Cart: React.FC = () => {
  const { items, updateQuantity, clearCart } = useCart();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Calculate total price
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePaymentComplete = () => {
    // Clear the cart after successful payment
    clearCart();
    alert('Payment successful! Thank you for your order.');
  };

  return (
    <>
      <CartContainer>
        <CartTitle>
          Your Cart
          <span>🛒</span>
        </CartTitle>
        
        {items.length === 0 ? (
          <EmptyCartMessage>
            <span style={{ fontSize: '1.5rem' }}>🛒</span>
            Your cart is empty
          </EmptyCartMessage>
        ) : (
          <>
            <CartItems>
              {items.map((item) => (
                <CartItem key={item.id}>
                  <ItemInfo>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                  </ItemInfo>
                  <QuantityControls>
                    <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      -
                    </QuantityButton>
                    <QuantityDisplay>{item.quantity}</QuantityDisplay>
                    <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </QuantityButton>
                    <RemoveButton onClick={() => updateQuantity(item.id, 0)}>
                      ✖️
                    </RemoveButton>
                  </QuantityControls>
                </CartItem>
              ))}
            </CartItems>
            
            <Total>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </Total>
            
            <CheckoutButton onClick={() => setIsPaymentModalOpen(true)}>
              💳 Proceed to Checkout
            </CheckoutButton>
          </>
        )}
      </CartContainer>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        total={total}
        onPaymentComplete={handlePaymentComplete}
      />
    </>
  );
};

export default Cart; 
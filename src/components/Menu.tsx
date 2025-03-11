import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
// import { ShoppingCart, Plus } from 'lucide-react';

const MenuSection = styled.section`
  padding: 2rem 0;
`;

const MenuTitle = styled.h2`
  color: ${({ theme }) => theme.primary};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MenuItem = styled.div`
  background-color: ${({ theme }) => theme.headerBg};
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const MenuItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const MenuItemContent = styled.div`
  padding: 1.5rem;
`;

const MenuItemTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
`;

const MenuItemDescription = styled.p`
  color: ${({ theme }) => theme.text}cc;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const MenuItemPrice = styled.p`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
`;

const OrderButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const AddedBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  opacity: 0;
  transform: translateY(-10px);
  animation: fadeInOut 2s ease forwards;
  
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(-10px); }
    20% { opacity: 1; transform: translateY(0); }
    80% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-10px); }
  }
`;

const MenuItemWrapper = styled.div`
  position: relative;
`;

// Define the menu items with proper types
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, and our special sauce',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: '2',
    name: 'Chicken Wings',
    description: 'Crispy wings tossed in your choice of sauce: BBQ, Buffalo, or Honey Garlic',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: '3',
    name: 'Loaded Fries',
    description: 'Crispy fries topped with cheese, bacon, and green onions',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: '4',
    name: 'Veggie Wrap',
    description: 'Fresh vegetables, hummus, and feta cheese in a whole wheat wrap',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: '5',
    name: 'Fish & Chips',
    description: 'Beer-battered fish with crispy fries and tartar sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1579208030886-b937da0925dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: '6',
    name: 'Milkshake',
    description: 'Creamy milkshake in vanilla, chocolate, or strawberry',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  }
];

interface MenuProps {
  translations: {
    menu: {
      title: string;
      orderNow: string;
    };
  };
}

const Menu: React.FC<MenuProps> = ({ translations }) => {
  const { addItem } = useCart();
  const [addedItems, setAddedItems] = React.useState<Record<string, boolean>>({});

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price
    });
    
    // Show visual feedback
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    
    // Hide the badge after animation
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  return (
    <MenuSection>
      <MenuTitle>{translations.menu.title}</MenuTitle>
      <MenuGrid>
        {menuItems.map((item) => (
          <MenuItemWrapper key={item.id}>
            {addedItems[item.id] && <AddedBadge>Added to cart!</AddedBadge>}
            <MenuItem>
              <MenuItemImage src={item.image} alt={item.name} />
              <MenuItemContent>
                <MenuItemTitle>{item.name}</MenuItemTitle>
                <MenuItemDescription>{item.description}</MenuItemDescription>
                <MenuItemPrice>${item.price.toFixed(2)}</MenuItemPrice>
                <OrderButton onClick={() => handleAddToCart(item)}>
                  🛒 {translations.menu.orderNow}
                </OrderButton>
              </MenuItemContent>
            </MenuItem>
          </MenuItemWrapper>
        ))}
      </MenuGrid>
    </MenuSection>
  );
};

export default Menu; 
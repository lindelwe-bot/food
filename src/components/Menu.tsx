import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
// import { ShoppingCart, Plus } from 'lucide-react';

const MenuSection = styled.section`
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const MenuTitle = styled.h2`
  color: ${({ theme }) => theme.primary};
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
`;

const MenuCategories = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button<{ $active?: boolean }>`
  background-color: ${({ theme, $active }) => $active ? theme.primary : 'transparent'};
  color: ${({ theme, $active }) => $active ? 'white' : theme.text};
  border: 2px solid ${({ theme }) => theme.primary};
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  font-weight: ${({ $active }) => $active ? 'bold' : 'normal'};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme, $active }) => $active ? theme.primary : `${theme.primary}20`};
  }
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
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
  cursor: pointer;
  
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
  color: ${({ theme }) => theme.textSecondary};
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
  width: 100%;
  justify-content: center;
  
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

const MenuItemTag = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${({ theme }) => theme.secondary};
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: bold;
`;

// Define the menu items with proper types
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags?: string[];
}

const menuItems: MenuItem[] = [
  // Burgers
  {
    id: '1',
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, and our special sauce',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    category: 'burgers',
    tags: ['bestseller']
  },
  {
    id: '2',
    name: 'Cheese Burger',
    description: 'Classic burger with melted cheddar cheese and pickles',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    category: 'burgers'
  },
  {
    id: '3',
    name: 'Bacon Burger',
    description: 'Beef patty with crispy bacon, cheese, and BBQ sauce',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    category: 'burgers',
    tags: ['new']
  },
  {
    id: '4',
    name: 'Veggie Burger',
    description: 'Plant-based patty with fresh vegetables and vegan mayo',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    category: 'burgers',
    tags: ['vegetarian']
  },
  
  // Sides
  {
    id: '5',
    name: 'Chicken Wings',
    description: 'Crispy wings tossed in your choice of sauce: BBQ, Buffalo, or Honey Garlic',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    category: 'sides',
    tags: ['spicy']
  },
  {
    id: '6',
    name: 'Loaded Fries',
    description: 'Crispy fries topped with cheese, bacon, and green onions',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    category: 'sides',
    tags: ['bestseller']
  },
  {
    id: '7',
    name: 'Onion Rings',
    description: 'Golden fried onion rings with our signature dipping sauce',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    category: 'sides'
  },
  {
    id: '8',
    name: 'Mozzarella Sticks',
    description: 'Breaded mozzarella sticks with marinara sauce',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1548340748-6d2b7d7da280?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    category: 'sides'
  },
  
  // Mains
  {
    id: '9',
    name: 'Fish & Chips',
    description: 'Beer-battered fish with crispy fries and tartar sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1579208030886-b937da0925dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    category: 'mains'
  },
  {
    id: '10',
    name: 'Chicken Tenders',
    description: 'Crispy chicken tenders with choice of dipping sauce',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    category: 'mains'
  },
  {
    id: '11',
    name: 'Veggie Wrap',
    description: 'Fresh vegetables, hummus, and feta cheese in a whole wheat wrap',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    category: 'mains',
    tags: ['vegetarian']
  },
  
  // Drinks
  {
    id: '12',
    name: 'Chocolate Milkshake',
    description: 'Creamy chocolate milkshake topped with whipped cream',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    category: 'drinks'
  },
  {
    id: '13',
    name: 'Vanilla Milkshake',
    description: 'Creamy vanilla milkshake topped with whipped cream',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1568901839119-631418a3910d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    category: 'drinks'
  },
  {
    id: '14',
    name: 'Strawberry Milkshake',
    description: 'Creamy strawberry milkshake topped with whipped cream',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    category: 'drinks'
  },
  {
    id: '15',
    name: 'Fresh Lemonade',
    description: 'Freshly squeezed lemonade with a hint of mint',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    category: 'drinks',
    tags: ['new']
  },
  
  // Desserts
  {
    id: '16',
    name: 'Chocolate Brownie',
    description: 'Warm chocolate brownie with vanilla ice cream',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    category: 'desserts'
  },
  {
    id: '17',
    name: 'Apple Pie',
    description: 'Homemade apple pie with a scoop of vanilla ice cream',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1535920527002-b35e96722969?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    category: 'desserts',
    tags: ['bestseller']
  },
  {
    id: '18',
    name: 'Cheesecake',
    description: 'New York style cheesecake with berry compote',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    category: 'desserts'
  }
];

interface MenuProps {
  translations: {
    title: string;
    orderNow: string;
  };
}

const Menu: React.FC<MenuProps> = ({ translations }) => {
  const { addItem } = useCart();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'burgers', name: 'Burgers' },
    { id: 'sides', name: 'Sides' },
    { id: 'mains', name: 'Mains' },
    { id: 'drinks', name: 'Drinks' },
    { id: 'desserts', name: 'Desserts' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

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
      <MenuTitle>{translations.title}</MenuTitle>
      
      <MenuCategories>
        {categories.map(category => (
          <CategoryButton 
            key={category.id}
            $active={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </CategoryButton>
        ))}
      </MenuCategories>
      
      <MenuGrid>
        {filteredItems.map((item) => (
          <MenuItemWrapper key={item.id}>
            {addedItems[item.id] && <AddedBadge>Added to cart!</AddedBadge>}
            {item.tags && item.tags.includes('new') && <MenuItemTag>New</MenuItemTag>}
            {item.tags && item.tags.includes('bestseller') && <MenuItemTag>Best Seller</MenuItemTag>}
            {item.tags && item.tags.includes('vegetarian') && <MenuItemTag>Vegetarian</MenuItemTag>}
            {item.tags && item.tags.includes('spicy') && <MenuItemTag>Spicy</MenuItemTag>}
            <MenuItem onClick={() => handleAddToCart(item)}>
              <MenuItemImage src={item.image} alt={item.name} />
              <MenuItemContent>
                <MenuItemTitle>{item.name}</MenuItemTitle>
                <MenuItemDescription>{item.description}</MenuItemDescription>
                <MenuItemPrice>${item.price.toFixed(2)}</MenuItemPrice>
                <OrderButton>
                  🛒 {translations.orderNow}
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
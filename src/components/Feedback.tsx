import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FeedbackSection = styled.section`
  padding: 4rem 2rem;
  background-color: ${({ theme }) => theme.background};
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.primary};
  font-size: 2.5rem;
  margin-bottom: 3rem;
`;

const FeedbackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  padding: 0 1rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FeedbackCard = styled.div`
  background-color: ${({ theme }) => theme.headerBg};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeedbackTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProgressBarContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  border-radius: 10px;
  height: 20px;
  overflow: hidden;
  margin: 1rem 0;
`;

interface ProgressBarFillProps {
  percentage: number;
  color: string;
}

const ProgressBarFill = styled.div<ProgressBarFillProps>`
  height: 100%;
  width: ${({ percentage }) => `${percentage}%`};
  background-color: ${({ color }) => color};
  transition: width 2s ease-out;
`;

const Percentage = styled.span`
  color: ${({ theme }) => theme.primary};
  font-size: 2rem;
  font-weight: bold;
  display: block;
  margin-top: 0.5rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  margin-top: 1rem;
`;

interface FeedbackItemProps {
  title: string;
  percentage: number;
  color: string;
  icon: string;
  description: string;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ title, percentage, color, icon, description }) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPercentage(percentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <FeedbackCard>
      <FeedbackTitle>
        {icon} {title}
      </FeedbackTitle>
      <ProgressBarContainer>
        <ProgressBarFill percentage={currentPercentage} color={color} />
      </ProgressBarContainer>
      <Percentage>{currentPercentage}%</Percentage>
      <Description>{description}</Description>
    </FeedbackCard>
  );
};

const Feedback: React.FC = () => {
  const feedbackData = [
    {
      title: 'Customer Satisfaction',
      percentage: 95,
      color: '#4CAF50',
      icon: '😊',
      description: 'Our customers consistently rate their dining experience as excellent'
    },
    {
      title: 'Food Quality',
      percentage: 98,
      color: '#2196F3',
      icon: '🍽️',
      description: 'We maintain the highest standards of food quality and freshness'
    },
    {
      title: 'Service Speed',
      percentage: 92,
      color: '#FF9800',
      icon: '⚡',
      description: 'Quick and efficient service without compromising quality'
    },
    {
      title: 'Cleanliness',
      percentage: 97,
      color: '#9C27B0',
      icon: '✨',
      description: 'We maintain impeccable cleanliness throughout our restaurant'
    }
  ];

  return (
    <FeedbackSection>
      <Title>Customer Feedback</Title>
      <FeedbackGrid>
        {feedbackData.map((item, index) => (
          <FeedbackItem
            key={index}
            title={item.title}
            percentage={item.percentage}
            color={item.color}
            icon={item.icon}
            description={item.description}
          />
        ))}
      </FeedbackGrid>
    </FeedbackSection>
  );
};

export default Feedback; 
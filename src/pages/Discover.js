import React, { useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, Spacing } from '../styles/globalStyles';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';
import { FiChevronRight, FiChevronLeft, FiShoppingCart } from 'react-icons/fi';

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Spacing.xl};
`;

const Title = styled.h1`
  color: ${Colors.lightText};
  font-size: 32px;
  font-weight: 700;
  margin: 0;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: ${Colors.lightText};
  font-weight: 700;
  margin: ${Spacing.lg} 0 ${Spacing.md} 0;
  display: flex;
  align-items: center;
  gap: ${Spacing.md};
`;

const ScrollContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacing.md};
  margin-bottom: ${Spacing.xl};
`;

const CardsWrapper = styled.div`
  display: flex;
  gap: ${Spacing.md};
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: ${Spacing.sm};
  flex: 1;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${Colors.primary};
    border-radius: 3px;
  }
`;

const ScrollButton = styled.button`
  background-color: ${Colors.primary};
  border: none;
  color: ${Colors.lightText};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background-color: ${Colors.accentPurple};
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DescriptionText = styled.p`
  color: ${Colors.mutedText};
  font-size: 14px;
  margin: 0 0 ${Spacing.lg} 0;
`;

const ConcertCard = styled.div`
  background-color: ${Colors.secondaryBg};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  flex-shrink: 0;
  width: 280px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(168, 85, 247, 0.3);
  }
`;

const ConcertImage = styled.div`
  background: linear-gradient(135deg, ${Colors.accentPurple} 0%, ${Colors.primary} 100%);
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.lightText};
  font-weight: 800;
  font-size: 16px;
`;

const ConcertInfo = styled.div`
  padding: ${Spacing.lg};
`;

const ConcertTitle = styled.h3`
  color: ${Colors.lightText};
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 ${Spacing.sm} 0;
`;

const ConcertSubtitle = styled.p`
  color: ${Colors.mutedText};
  font-size: 12px;
  margin: 0 0 ${Spacing.md} 0;
`;

const ConcertPriceAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ConcertPrice = styled.span`
  color: ${Colors.primary};
  font-weight: 700;
  font-size: 14px;
`;

const AddToTicketsButton = styled.button`
  background-color: ${Colors.primary};
  border: none;
  color: ${Colors.lightText};
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${Colors.accentPurple};
  }
`;

// Mock data
const concertsData = [
  { id: 1, title: 'Concert', subtitle: 'Artist - Location', price: Math.floor(Math.random() * (750 - 150 + 1)) + 150 },
  { id: 2, title: 'Concert', subtitle: 'Artist - Location', price: Math.floor(Math.random() * (750 - 150 + 1)) + 150 },
  { id: 3, title: 'Concert', subtitle: 'Artist - Location', price: Math.floor(Math.random() * (750 - 150 + 1)) + 150 },
  { id: 4, title: 'Concert', subtitle: 'Artist - Location', price: Math.floor(Math.random() * (750 - 150 + 1)) + 150 },
  { id: 5, title: 'Concert', subtitle: 'Artist - Location', price: Math.floor(Math.random() * (750 - 150 + 1)) + 150 },
];

const artistsData = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: 'Artist',
}));

const Discover = () => {
  const concertsRef = useRef(null);
  const artistsRef = useRef(null);
  const navigate = useNavigate();
  const { addToTickets } = useContext(AppContext);
  const [concertsList] = useState(concertsData);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleAddToTickets = (concert) => {
    addToTickets(concert);
  };

  return (
    <PageLayout>
      <TopBar>
        <Title>Discover</Title>
        <Button primary onClick={() => navigate('/tickets')}>Tickets</Button>
      </TopBar>

        <SectionTitle>
          Featured Concerts
          <span style={{ fontSize: '18px', color: Colors.mutedText, cursor: 'pointer', marginLeft: 'auto' }} onClick={() => navigate('/concerts')}>→</span>
        </SectionTitle>
        <ScrollContainer>
          <ScrollButton onClick={() => scroll(concertsRef, 'left')}>
            <FiChevronLeft size={20} />
          </ScrollButton>
          <CardsWrapper ref={concertsRef}>
            {concertsList.map((concert) => (
              <ConcertCard key={concert.id}>
                <ConcertImage>{concert.title}</ConcertImage>
                <ConcertInfo>
                  <ConcertTitle>{concert.title}</ConcertTitle>
                  <ConcertSubtitle>{concert.subtitle}</ConcertSubtitle>
                  <ConcertPriceAndButton>
                    <ConcertPrice>{concert.price} EGP</ConcertPrice>
                    <AddToTicketsButton onClick={() => handleAddToTickets(concert)}>
                      <FiShoppingCart size={18} />
                    </AddToTicketsButton>
                  </ConcertPriceAndButton>
                </ConcertInfo>
              </ConcertCard>
            ))}
          </CardsWrapper>
          <ScrollButton onClick={() => navigate('/concerts')}>
            <FiChevronRight size={20} />
          </ScrollButton>
        </ScrollContainer>

        <SectionTitle>
          Artists
          <span style={{ fontSize: '18px', color: Colors.mutedText, cursor: 'pointer', marginLeft: 'auto' }} onClick={() => navigate('/artists')}>→</span>
        </SectionTitle>
        <DescriptionText>Join your favorite artists' communities</DescriptionText>
        <ScrollContainer>
          <ScrollButton onClick={() => scroll(artistsRef, 'left')}>
            <FiChevronLeft size={20} />
          </ScrollButton>
          <CardsWrapper ref={artistsRef}>
            {artistsData.map((artist) => (
              <Card
                key={artist.id}
                title={artist.title}
                minWidth="200px"
                height="180px"
              />
            ))}
          </CardsWrapper>
          <ScrollButton onClick={() => navigate('/artists')}>
            <FiChevronRight size={20} />
          </ScrollButton>
        </ScrollContainer>
    </PageLayout>
  );
};

export default Discover;

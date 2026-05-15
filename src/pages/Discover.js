import React, { useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, Spacing } from '../styles/globalStyles';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';
import { FiChevronRight, FiChevronLeft, FiShoppingCart } from 'react-icons/fi';

const DiscoverContainer = styled.div`
  min-height: 100vh;
  background-image: url('/discover-background.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
    pointer-events: none;
  }
`;

const DiscoverContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 0;
`;

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
  overflow-y: visible;
  scroll-behavior: smooth;
  padding: ${Spacing.lg} ${Spacing.md};
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
  flex-shrink: 0;
  transition: background-color 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: background-color, transform;
  outline: none;

  &:hover {
    background-color: ${Colors.accentPurple};
    transform: scale(1.1);
  }

  &:active,
  &:focus {
    outline: none;
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
    box-shadow: 0 8px 24px rgba(250, 165, 230, 0.3);
  }
`;

const ConcertImage = styled.div`
  background: ${props => props.$backgroundImage ? 'none' : 'linear-gradient(135deg, ${Colors.accentPurple} 0%, ${Colors.primary} 100%)'};
  background-image: ${props => props.$backgroundImage ? `url(${props.$backgroundImage})` : 'none'};
  background-size: cover;
  background-position: center;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.lightText};
  font-weight: 800;
  font-size: 16px;
  border-radius: 12px 12px 0 0;

`;

const ConcertInfo = styled.div`
  padding: ${Spacing.lg};
  background: linear-gradient(180deg, rgba(98, 62, 98, 0.5) 0%, rgba(52, 32, 50, 0.7) 100%);
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
  color: ${Colors.mutedText};
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
  { id: 1, title: 'The Weeknd', subtitle: '04/02/2027 - New Jersey USA', price: Math.floor(Math.random() * (750 - 150 + 1)) + 150, image: 'https://www.movin925.com/wp-content/uploads/2025/06/m_Weekndmetlifestadium_060925.jpg' },
  { id: 2, title: 'Juice WRLD', subtitle: '25/12/2026 - Chicago USA', price: Math.floor(Math.random() * (750 - 150 + 1)) + 150, image: 'https://wallpapers.com/images/hd/juice-wrld-concert-208al6fki2d5drbv.jpg' },
  { id: 3, title: 'Eminem', subtitle: '17/08/2026 - Guadalajara Mexico', price: Math.floor(Math.random() * (750 - 150 + 1)) + 150, image: 'https://www.eminem.com/wp-content/uploads/sites/2004/2025/11/1.-jw-em-768x432.jpg' },
  { id: 4, title: 'Kendrick Lamar', subtitle: '03/03/2026 - London UK', price: Math.floor(Math.random() * (750 - 150 + 1)) + 150, image: 'https://variety.com/wp-content/uploads/2024/06/EWA8369_XqVgh9BR_2aAMGcT3_20240620102122-e1718910178273.jpeg' },
  { id: 5, title: 'Drake', subtitle: '21/07/2026 - Frankfurt, Germany', price: Math.floor(Math.random() * (750 - 150 + 1)) + 150, image: 'https://media.gq.com/photos/57d9b957436f78925d2b25a7/16:9/w_2560%2Cc_limit/GettyImages-603117346.jpg' },
];

const artistsData = [
  { id: 1, title: 'The Weeknd', image: 'https://preview.redd.it/you-guys-remember-when-people-actually-thought-he-did-this-v0-amp4c397yxmc1.jpeg?auto=webp&s=a7f0c89ca2d024bdca1c56aaad124d3bd34d3937' },
  { id: 2, title: 'Juice WRLD', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTymtkkG3Mxg2iccje2OPrdub5cDWED5vHh9A&s' },
  { id: 3, title: 'Michael Jackson', image: 'https://i.pinimg.com/236x/3a/87/4d/3a874defbd20095e889e486a242a91de.jpg' },
  { id: 4, title: 'Eminem', image: 'https://preview.redd.it/choose-your-cursed-eminem-v0-4n4o0rrnw5rg1.jpg?width=557&format=pjpg&auto=webp&s=f282cd20c03f117444662a40398d85ef69a6e797' },
  { id: 5, title: 'Kendrick Lamar', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS85r1025td52AKV3x9arSk0m3ULQp7GMNXvg&s' },
  { id: 6, title: 'Drake', image: 'https://i.pinimg.com/736x/ee/05/1b/ee051b979e7fea90e236b0557e534821.jpg' },
  { id: 7, title: 'Billie Eilish', image: 'https://townsquare.media/site/252/files/2024/05/attachment-Billie-Eilish.jpg?w=300&q=75' },
  { id: 8, title: 'Sombr', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkKpoTJ-r5STXpssx4ulxlDzno_3DuEQzg6Q&s' },
  { id: 9, title: 'Taylor Swift', image: 'https://i.pinimg.com/564x/0f/a5/53/0fa553298f5cde0dbdb21dcac7272bec.jpg' },
  { id: 10, title: 'Tame Impala', image: 'https://media.tenor.com/Qzljd4nCmCwAAAAe/saul-goodman-tame-impala.png' },
  { id: 11, title: 'Ariana Grande', image: 'https://i.redd.it/imagine-if-ariana-joins-this-reddit-and-sees-what-nonsense-v0-6fy4xkfpltze1.jpg?width=640&format=pjpg&auto=webp&s=20c121bd7e3ff91d19631f750d7da21cffb97bc2' },
  { id: 12, title: 'Linkin Park', image: 'https://i1.sndcdn.com/artworks-000421407825-s7djcc-t500x500.jpg' },
];

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
    <DiscoverContainer>
      <PageLayout>
        <DiscoverContent>
          <TopBar>
            <Title>Discover</Title>
            <Button primary onClick={() => navigate('/tickets')}>Tickets</Button>
          </TopBar>

          <SectionTitle>
            Featured Concerts
          </SectionTitle>
        <ScrollContainer>
          <CardsWrapper ref={concertsRef}>
            {concertsList.map((concert) => (
              <ConcertCard key={concert.id}>
                <ConcertImage $backgroundImage={concert.image}>
                  {!concert.image && concert.title}
                </ConcertImage>
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

        </ScrollContainer>

        <SectionTitle>
          Featured Artists
        </SectionTitle>
        <DescriptionText>Join your favorite artists' communities</DescriptionText>
        <ScrollContainer>
          <CardsWrapper ref={artistsRef}>
            {artistsData.map((artist) => (
              <Card
                key={artist.id}
                title={artist.title}
                image={artist.image}
                minWidth="200px"
                height="180px"
                onClick={() => navigate(`/artist-community/${artist.id}`)}
              />
            ))}
          </CardsWrapper>
          <ScrollButton onClick={() => navigate('/artists')} title="View all artists">
            <FiChevronRight size={20} />
          </ScrollButton>
        </ScrollContainer>
        </DiscoverContent>
      </PageLayout>
    </DiscoverContainer>
  );
};

export default Discover;

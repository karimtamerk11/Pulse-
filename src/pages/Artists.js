import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Spacing } from '../styles/globalStyles';
import PageLayout, { Grid, Card, CardImage, CardInfo, CardTitle, CardFooter } from '../components/PageLayout';
import Button from '../components/Button';
import { FiUserPlus } from 'react-icons/fi';

const JoinButton = styled(Button)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${Spacing.sm};
`;

const Artists = () => {
  const [joinedArtists, setJoinedArtists] = useState([]);
  const navigate = useNavigate();
  const artists = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Artist ${i + 1}`,
  }));

  const handleJoinCommunity = (artist, e) => {
    e.stopPropagation();
    if (!joinedArtists.includes(artist.id)) {
      setJoinedArtists([...joinedArtists, artist.id]);
    }
    navigate(`/artist-community/${artist.id}`);
  };

  return (
    <PageLayout title="Artists">
      <Grid>
        {artists.map((artist) => (
          <Card key={artist.id}>
            <CardImage $clickable onClick={() => navigate(`/artist-community/${artist.id}`)}>
              Artist
            </CardImage>
            <CardInfo>
              <CardTitle>{artist.name}</CardTitle>
              <CardFooter>
                <JoinButton
                  primary
                  onClick={(e) => handleJoinCommunity(artist, e)}
                >
                  <FiUserPlus size={16} />
                  {joinedArtists.includes(artist.id) ? 'Visit' : 'Join'}
                </JoinButton>
              </CardFooter>
            </CardInfo>
          </Card>
        ))}
      </Grid>
    </PageLayout>
  );
};

export default Artists;

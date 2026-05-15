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
  const artists = [
    { id: 1, name: 'The Weeknd', image: 'https://preview.redd.it/you-guys-remember-when-people-actually-thought-he-did-this-v0-amp4c397yxmc1.jpeg?auto=webp&s=a7f0c89ca2d024bdca1c56aaad124d3bd34d3937' },
    { id: 2, name: 'Juice WRLD', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTymtkkG3Mxg2iccje2OPrdub5cDWED5vHh9A&s' },
    { id: 3, name: 'Michael Jackson', image: 'https://i.pinimg.com/236x/3a/87/4d/3a874defbd20095e889e486a242a91de.jpg' },
    { id: 4, name: 'Eminem', image: 'https://preview.redd.it/choose-your-cursed-eminem-v0-4n4o0rrnw5rg1.jpg?width=557&format=pjpg&auto=webp&s=f282cd20c03f117444662a40398d85ef69a6e797' },
    { id: 5, name: 'Kendrick Lamar', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS85r1025td52AKV3x9arSk0m3ULQp7GMNXvg&s' },
    { id: 6, name: 'Drake', image: 'https://i.pinimg.com/736x/ee/05/1b/ee051b979e7fea90e236b0557e534821.jpg' },
    { id: 7, name: 'Billie Eilish', image: 'https://townsquare.media/site/252/files/2024/05/attachment-Billie-Eilish.jpg?w=300&q=75' },
    { id: 8, name: 'Sombr', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkKpoTJ-r5STXpssx4ulxlDzno_3DuEQzg6Q&s' },
    { id: 9, name: 'Taylor Swift', image: 'https://i.pinimg.com/564x/0f/a5/53/0fa553298f5cde0dbdb21dcac7272bec.jpg' },
    { id: 10, name: 'Tame Impala', image: 'https://media.tenor.com/Qzljd4nCmCwAAAAe/saul-goodman-tame-impala.png' },
    { id: 11, name: 'Ariana Grande', image: 'https://i.redd.it/imagine-if-ariana-joins-this-reddit-and-sees-what-nonsense-v0-6fy4xkfpltze1.jpg?width=640&format=pjpg&auto=webp&s=20c121bd7e3ff91d19631f750d7da21cffb97bc2' },
    { id: 12, name: 'Linkin Park', image: 'https://i1.sndcdn.com/artworks-000421407825-s7djcc-t500x500.jpg' },
  ];

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
            <CardImage 
              $clickable 
              $backgroundImage={artist.image}
              onClick={() => navigate(`/artist-community/${artist.id}`)}
            >
              {!artist.image && 'Artist'}
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

import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Colors, Spacing } from '../styles/globalStyles';
import PageLayout, { Grid, Card, CardImage, CardInfo, CardTitle, CardSubtitle, CardFooter } from '../components/PageLayout';
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';
import { FiShoppingCart } from 'react-icons/fi';

const Price = styled.span`
  color: ${Colors.primary};
  font-weight: 700;
  font-size: 14px;
`;

const Concerts = () => {
  const { addToTickets } = useContext(AppContext);
  const concerts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: 'Concert',
    subtitle: 'Artist - Location',
    price: Math.floor(Math.random() * (750 - 150 + 1)) + 150,
  }));

  return (
    <PageLayout title="Concerts">
      <Grid>
        {concerts.map((concert) => (
          <Card key={concert.id}>
            <CardImage>{concert.title}</CardImage>
            <CardInfo>
              <CardTitle>{concert.title}</CardTitle>
              <CardSubtitle>{concert.subtitle}</CardSubtitle>
              <CardFooter>
                <Price>{concert.price} EGP</Price>
                <Button primary onClick={() => addToTickets(concert)}>
                  <FiShoppingCart size={16} />
                </Button>
              </CardFooter>
            </CardInfo>
          </Card>
        ))}
      </Grid>
    </PageLayout>
  );
};

export default Concerts;

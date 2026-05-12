import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Colors, Spacing } from '../styles/globalStyles';
import PageLayout from '../components/PageLayout';
import Button from '../components/Button';
import Input from '../components/Input';
import { AppContext } from '../context/AppContext';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${Spacing.lg};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const TicketsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.lg};
`;

const EmptyMessage = styled.p`
  color: ${Colors.mutedText};
  text-align: center;
  padding: ${Spacing.xl};
  font-size: 16px;
`;

const TicketItem = styled.div`
  background-color: ${Colors.secondaryBg};
  border-radius: 12px;
  padding: ${Spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const TicketInfo = styled.div`
  flex: 1;
`;

const TicketTitle = styled.h3`
  color: ${Colors.lightText};
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 ${Spacing.sm} 0;
`;

const TicketPrice = styled.p`
  color: ${Colors.primary};
  font-weight: 700;
  font-size: 18px;
  margin: 0;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacing.md};
  background-color: ${Colors.darkBg};
  border-radius: 6px;
  padding: ${Spacing.sm};
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  color: ${Colors.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  &:hover {
    color: ${Colors.accentPurple};
  }
`;

const Quantity = styled.span`
  color: ${Colors.lightText};
  font-weight: 600;
  min-width: 30px;
  text-align: center;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${Colors.errorRed};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(244, 67, 54, 0.1);
  }
`;

const SummaryCard = styled.div`
  background-color: ${Colors.secondaryBg};
  border-radius: 12px;
  padding: ${Spacing.lg};
  position: sticky;
  top: ${Spacing.xl};

  @media (max-width: 1024px) {
    position: static;
    top: auto;
  }
`;

const SummaryTitle = styled.h3`
  color: ${Colors.lightText};
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 ${Spacing.lg} 0;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Spacing.md};
  color: ${Colors.lightText};
  font-size: 14px;
`;

const SummaryDivider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: ${Spacing.lg} 0;
`;

const TotalRow = styled(SummaryRow)`
  font-size: 18px;
  font-weight: 700;
  color: ${Colors.primary};
`;

const CheckoutForm = styled.div`
  margin-top: ${Spacing.lg};
`;

const CheckoutButton = styled(Button)`
  width: 100%;
  margin-top: ${Spacing.lg};
`;

const Tickets = () => {
  const { tickets, updateTicketQuantity, removeFromTickets } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const total = tickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0);

  const handleQuantityChange = (concertId, newQuantity) => {
    updateTicketQuantity(concertId, newQuantity);
  };

  const handleCheckout = () => {
    if (email && cardNumber === '123456789') {
      alert('Checkout successful! Thank you for your purchase.');
      // Clear tickets after successful checkout
      tickets.forEach(ticket => removeFromTickets(ticket.id));
      setEmail('');
      setCardNumber('');
      setShowCheckoutForm(false);
    } else if (email && cardNumber !== '123456789') {
      alert('Invalid card number. Please use 123456789 for testing.');
    } else {
      alert('Please enter your email address.');
    }
  };

  return (
    <PageLayout title="Your Tickets">
      <Content>
          <TicketsList>
            {tickets.length === 0 ? (
              <EmptyMessage>
                No tickets yet. Browse concerts and add them to your cart!
              </EmptyMessage>
            ) : (
              tickets.map((ticket) => (
                <TicketItem key={ticket.id}>
                  <TicketInfo>
                    <TicketTitle>{ticket.title}</TicketTitle>
                    <TicketPrice>{ticket.price} EGP</TicketPrice>
                  </TicketInfo>

                  <QuantityControl>
                    <QuantityButton onClick={() => handleQuantityChange(ticket.id, ticket.quantity - 1)}>
                      <FiMinus size={16} />
                    </QuantityButton>
                    <Quantity>{ticket.quantity}</Quantity>
                    <QuantityButton onClick={() => handleQuantityChange(ticket.id, ticket.quantity + 1)}>
                      <FiPlus size={16} />
                    </QuantityButton>
                  </QuantityControl>

                  <DeleteButton onClick={() => removeFromTickets(ticket.id)}>
                    <FiTrash2 size={20} />
                  </DeleteButton>
                </TicketItem>
              ))
            )}
          </TicketsList>

          {tickets.length > 0 && (
            <SummaryCard>
              <SummaryTitle>Order Summary</SummaryTitle>
              {tickets.map((ticket) => (
                <SummaryRow key={ticket.id}>
                  <span>{ticket.title} x {ticket.quantity}</span>
                  <span>{ticket.price * ticket.quantity} EGP</span>
                </SummaryRow>
              ))}
              <SummaryDivider />
              <TotalRow>
                <span>Total</span>
                <span>{total} EGP</span>
              </TotalRow>

              {!showCheckoutForm && (
                <CheckoutButton primary onClick={() => setShowCheckoutForm(true)}>
                  Proceed to Checkout
                </CheckoutButton>
              )}

              {showCheckoutForm && (
                <CheckoutForm>
                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Card Number (123456789 for testing)"
                    type="password"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    style={{ marginTop: `${Spacing.md}` }}
                  />
                  <CheckoutButton primary onClick={handleCheckout}>
                    Complete Purchase
                  </CheckoutButton>
                  <CheckoutButton onClick={() => setShowCheckoutForm(false)} style={{ marginTop: `${Spacing.md}`, backgroundColor: Colors.darkGray }}>
                    Cancel
                  </CheckoutButton>
                </CheckoutForm>
              )}
            </SummaryCard>
          )}
        </Content>
    </PageLayout>
  );
};

export default Tickets;

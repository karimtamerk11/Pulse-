import styled from 'styled-components';
import { Colors, Spacing } from '../styles/globalStyles';

export const CardContainer = styled.div`
  background-color: ${Colors.secondaryBg};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: ${props => props.$minWidth || '200px'};
  flex-shrink: 0;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(123, 44, 191, 0.3);
  }
`;

export const CardImage = styled.div`
  width: 100%;
  height: ${props => props.$height || '200px'};
  background-color: ${Colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: ${Colors.mutedText};
`;

export const CardContent = styled.div`
  padding: ${Spacing.md};
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: ${Spacing.sm};
  color: ${Colors.lightText};
`;

export const CardSubtitle = styled.p`
  font-size: 14px;
  color: ${Colors.mutedText};
  margin: 0;
`;

const Card = ({ title, subtitle, image, minWidth, onClick, height }) => {
  return (
    <CardContainer $minWidth={minWidth} onClick={onClick}>
      <CardImage $height={height}>🖼️</CardImage>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
      </CardContent>
    </CardContainer>
  );
};

export default Card;

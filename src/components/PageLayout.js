import styled from 'styled-components';
import { Colors, Spacing } from '../styles/globalStyles';
import Sidebar from './Sidebar';
import NavigationButtons from './NavigationButtons';

export const PageContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const PageContent = styled.div`
  flex: 1;
  margin-left: 200px;
  padding: ${Spacing.xl};
  overflow-y: auto;
  height: 100vh;

  @media (max-width: 768px) {
    margin-left: 60px;
    padding: ${Spacing.lg};
  }

  @media (max-width: 480px) {
    margin-left: 0;
    padding: ${Spacing.md};
  }
`;

export const PageTitle = styled.h1`
  font-size: 32px;
  color: ${Colors.lightText};
  font-weight: 800;
  margin: 0 0 ${Spacing.xl} 0;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.$cols || 3}, 1fr);
  gap: ${Spacing.lg};
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background-color: ${Colors.secondaryBg};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(250, 165, 230, 0.3);
  }
`;

export const CardImage = styled.div`
  background: ${props => props.$backgroundImage 
    ? `url(${props.$backgroundImage})` 
    : `linear-gradient(135deg, ${Colors.accentPurple} 0%, ${Colors.primary} 100%)`};
  background-size: cover;
  background-position: center;
  height: ${props => props.$height || '200px'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.lightText};
  font-weight: 800;
  font-size: 18px;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: all 0.3s ease;
  pointer-events: auto;
  user-select: none;

  &:hover {
    ${props => props.$clickable && `
      transform: scale(1.05);
      box-shadow: inset 0 0 0 4px rgba(250, 165, 230, 0.3);
    `}
  }
`;

export const CardInfo = styled.div`
  padding: ${Spacing.lg};
  background: linear-gradient(180deg, rgba(98, 62, 98, 0.5) 0%, rgba(52, 32, 50, 0.7) 100%);
`;

export const CardTitle = styled.h3`
  color: ${Colors.lightText};
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 ${Spacing.sm} 0;
`;

export const CardSubtitle = styled.p`
  color: ${Colors.mutedText};
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 ${Spacing.md} 0;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${Spacing.md};
`;

export const PageLayout = ({ children, title }) => (
  <>
    <PageContainer>
      <Sidebar />
      <PageContent>
        <NavigationButtons />
        {title && <PageTitle>{title}</PageTitle>}
        {children}
      </PageContent>
    </PageContainer>
  </>
);

export default PageLayout;

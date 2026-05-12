import styled from 'styled-components';
import { Colors } from '../styles/globalStyles';

export const AvatarContainer = styled.div`
  width: ${props => props.size || '60px'};
  height: ${props => props.size || '60px'};
  border-radius: 50%;
  background: linear-gradient(135deg, ${Colors.primary} 0%, ${Colors.accentPurple} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.size === '150px' ? '48px' : '24px'};
  color: ${Colors.lightText};
  flex-shrink: 0;
  overflow: hidden;
  border: 3px solid ${Colors.secondaryBg};
`;

const Avatar = ({ size = '60px', emoji = '👤' }) => {
  return <AvatarContainer size={size}>{emoji}</AvatarContainer>;
};

export default Avatar;

import styled from 'styled-components';
import { Colors, Spacing } from '../styles/globalStyles';

export const StyledButton = styled.button`
  background-color: ${props => props.$primary ? '#ffffff' : Colors.darkGray};
  color: ${props => props.$primary ? '#000000' : Colors.lightText};
  border: none;
  padding: ${Spacing.sm} ${Spacing.md};
  border-radius: 8px;
  font-size: 16px;
  font-weight: ${props => props.$primary ? '400' : '600'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Almarai', sans-serif;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};

  &:hover {
    background-color: ${props => props.$primary ? '#f0f0f0' : '#444444'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Button = ({ children, primary, fullWidth, onClick, type = 'button', disabled = false }) => {
  return (
    <StyledButton
      $primary={primary}
      $fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

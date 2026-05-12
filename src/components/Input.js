import styled from 'styled-components';
import { Colors, Spacing } from '../styles/globalStyles';

export const StyledInput = styled.input`
  width: 100%;
  padding: ${Spacing.md};
  border: none;
  border-radius: 8px;
  background-color: ${Colors.lightGray};
  color: ${Colors.darkGray};
  font-size: 16px;
  font-family: 'Almarai', sans-serif;
  margin-bottom: ${props => props.$hasError ? '4px' : Spacing.md};
  transition: all 0.3s ease;

  &::placeholder {
    color: #999999;
  }

  &:focus {
    outline: none;
    background-color: ${Colors.lightText};
    box-shadow: 0 0 0 3px rgba(123, 44, 191, 0.3);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  color: ${Colors.errorRed};
  font-size: 12px;
  margin-top: -8px;
  margin-bottom: ${Spacing.md};
`;

const Input = ({ placeholder, value, onChange, type = 'text', disabled = false, error = '' }) => {
  return (
    <>
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        disabled={disabled}
        $hasError={!!error}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
};

export default Input;

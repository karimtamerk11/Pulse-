import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, Spacing } from '../styles/globalStyles';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { AppContext } from '../context/AppContext';

const NavigationContainer = styled.div`
  display: flex;
  gap: ${Spacing.md};
  align-items: center;
  margin-bottom: ${Spacing.lg};
  position: relative;
  z-index: 100;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid ${Colors.primary};
  background-color: ${props => props.$disabled ? Colors.darkBg : Colors.primary};
  color: ${Colors.lightText};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.4 : 1};
  font-size: 20px;
  transition: background-color 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: background-color, transform;
  outline: none;

  &:hover {
    ${props => !props.$disabled && `
      background-color: ${Colors.accentPurple};
      transform: scale(1.05);
      border-color: ${Colors.accentPurple};
    `}
  }

  &:active {
    ${props => !props.$disabled && `
      transform: scale(0.95);
    `}
  }

  &:focus {
    outline: none;
  }
`;

function NavigationButtons() {
  const navigate = useNavigate();
  const { goBack, goForward, canGoBack, canGoForward, setIsNavigatingFromHistory } = useContext(AppContext);

  const handleGoBack = () => {
    const prevPath = goBack();
    if (prevPath) {
      navigate(prevPath);
      // Clear the flag after a short delay to allow the location to update
      setTimeout(() => setIsNavigatingFromHistory(false), 50);
    }
  };

  const handleGoForward = () => {
    const nextPath = goForward();
    if (nextPath) {
      navigate(nextPath);
      // Clear the flag after a short delay to allow the location to update
      setTimeout(() => setIsNavigatingFromHistory(false), 50);
    }
  };

  return (
    <NavigationContainer>
      <NavButton 
        $disabled={!canGoBack()} 
        onClick={handleGoBack}
        title={canGoBack() ? 'Go to previous page' : 'No previous page'}
      >
        <FiChevronLeft />
      </NavButton>
      <NavButton 
        $disabled={!canGoForward()} 
        onClick={handleGoForward}
        title={canGoForward() ? 'Go to next page' : 'No next page'}
      >
        <FiChevronRight />
      </NavButton>
    </NavigationContainer>
  );
}

export default NavigationButtons;

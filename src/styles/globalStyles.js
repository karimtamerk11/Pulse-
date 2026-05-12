import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Almarai', sans-serif;
    background: linear-gradient(135deg, #1a0a2e 0%, #2d1b3d 50%, #1a0a2e 100%);
    color: #ffffff;
    min-height: 100vh;
  }

  html, body, #root {
    height: 100%;
  }
`;

export const Colors = {
  primary: '#7b2cbf',
  darkBg: '#1a0a2e',
  secondaryBg: '#2d1b3d',
  lightText: '#ffffff',
  mutedText: '#b0b0b0',
  accentPurple: '#a020f0',
  lightGray: '#e0e0e0',
  darkGray: '#333333',
  errorRed: '#ff6b6b'
};

export const Spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px'
};

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
  primary: '#623e62',
  darkBg: '#1a0a2e',
  secondaryBg: '#342032',
  lightText: '#ffffff',
  mutedText: '#c892cc',
  accentPurple: '#9c5e9c',
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

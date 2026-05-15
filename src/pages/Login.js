import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, Spacing } from '../styles/globalStyles';
import Button from '../components/Button';
import Input from '../components/Input';
import { AppContext } from '../context/AppContext';

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('/Backgroundlogin.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const LoginCard = styled.div`
  background: linear-gradient(180deg, rgba(98, 62, 98, 0.5) 0%, rgba(52, 32, 50, 0.7) 100%);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: ${Spacing.xl};
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const LogoImage = styled.img`
  height: 80px;
  width: 100%;
  object-fit: contain;
  margin-bottom: ${Spacing.lg};
  display: block;
`;

const GoogleSignInImage = styled.img`
  height: 56px;
  width: 100%;
  object-fit: contain;
  cursor: not-allowed;
  opacity: 1;
  display: block;
`;

const Title = styled.h2`
  font-size: 20px;
  text-align: center;
  margin-bottom: ${Spacing.lg};
  color: ${Colors.lightText};
  font-weight: 700;
`;

const SignUpLink = styled.p`
  text-align: center;
  color: #ffffff;
  font-size: 14px;
  margin-top: ${Spacing.lg};

  a {
    color: ${Colors.mutedText};
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${Spacing.lg} 0;
  color: ${Colors.mutedText};
  font-size: 14px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${Colors.mutedText};
  }

  &::before {
    margin-right: ${Spacing.md};
  }

  &::after {
    margin-left: ${Spacing.md};
  }
`;

const GoogleButtonContainer = styled.div`
  width: 100%;
  margin-bottom: ${Spacing.md};
`;

const DisabledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${Spacing.lg};
  cursor: not-allowed;
  pointer-events: none;
`;

const ErrorMessage = styled.p`
  color: ${Colors.errorRed};
  font-size: 14px;
  margin-bottom: ${Spacing.md};
  text-align: center;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, signup } = useContext(AppContext);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setLoginError('');

    let isValid = true;

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        navigate('/discover');
      } else {
        setLoginError('Invalid email or password');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <LoginContainer>
      <LogoImage src="/Pulse.jpg" alt="Pulse Logo" />
      <LoginCard>
        <Title>LOG IN</Title>

        {loginError && <ErrorMessage>{loginError}</ErrorMessage>}

        <form onSubmit={handleLogin}>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
              setLoginError('');
            }}
            type="email"
            error={emailError}
          />

          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
              setLoginError('');
            }}
            type="password"
            error={passwordError}
          />

          <Button
            primary
            fullWidth
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <Divider>or continue with</Divider>

        <GoogleButtonContainer>
          <GoogleSignInImage src="/googlesignin.jpg" alt="Google Sign In" />
        </GoogleButtonContainer>

        <SignUpLink>
          Don't have an account? <a href="/signup">Sign up</a>
        </SignUpLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;

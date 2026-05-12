import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, Spacing } from '../styles/globalStyles';
import Button from '../components/Button';
import Input from '../components/Input';
import { AppContext } from '../context/AppContext';
import { FiMail } from 'react-icons/fi';

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a0a2e 0%, #2d1b3d 50%, #1a0a2e 100%);
`;

const LoginCard = styled.div`
  background-color: rgba(45, 27, 61, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: ${Spacing.xl};
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.h1`
  font-size: 48px;
  text-align: center;
  margin-bottom: ${Spacing.xl};
  color: ${Colors.lightText};
  font-weight: 800;
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
  color: ${Colors.mutedText};
  font-size: 14px;
  margin-top: ${Spacing.lg};

  a {
    color: ${Colors.primary};
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

const GoogleButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${Spacing.md};
  background-color: ${Colors.lightText};
  color: ${Colors.darkBg};
  margin-bottom: ${Spacing.lg};

  &:hover {
    background-color: #f0f0f0;
  }
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

  const handleGoogleLogin = () => {
    navigate('/signup');
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>Pulse</Logo>
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

        <GoogleButton
          onClick={handleGoogleLogin}
          fullWidth
        >
          <FiMail size={20} />
          Create New Account
        </GoogleButton>

        <SignUpLink>
          Don't have an account? <a onClick={() => navigate('/signup')}>Sign up</a>
        </SignUpLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;

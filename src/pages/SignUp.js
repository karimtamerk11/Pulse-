import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, Spacing } from '../styles/globalStyles';
import Button from '../components/Button';
import Input from '../components/Input';
import { AppContext } from '../context/AppContext';
import { FiCheck, FiX } from 'react-icons/fi';

const SignUpContainer = styled.div`
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
  overflow-y: auto;
`;

const SignUpCard = styled.div`
  background: linear-gradient(180deg, rgba(98, 62, 98, 0.5) 0%, rgba(52, 32, 50, 0.7) 100%);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: ${Spacing.xl};
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  margin: ${Spacing.lg} 0;
`;

const LogoImage = styled.img`
  height: 80px;
  width: auto;
  object-fit: contain;
  margin-bottom: ${Spacing.lg};
  display: block;
  flex-shrink: 0;
`;

const GoogleSignInImage = styled.img`
  height: 56px;
  width: 100%;
  object-fit: contain;
  cursor: not-allowed;
  opacity: 1;
  display: block;
  flex-shrink: 0;
  flex-grow: 0;
  line-height: 0;
`;

const Title = styled.h2`
  font-size: 20px;
  text-align: center;
  margin-bottom: ${Spacing.lg};
  color: ${Colors.lightText};
  font-weight: 700;
`;

const DescriptionText = styled.p`
  text-align: center;
  color: ${Colors.mutedText};
  font-size: 13px;
  margin-bottom: ${Spacing.lg};
  line-height: 1.5;
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
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: auto;
`;

const TermsText = styled.p`
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  line-height: 1.6;
  margin-top: ${Spacing.lg};

  a {
    color: ${Colors.mutedText};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginLink = styled.p`
  text-align: center;
  color: #ffffff;
  font-size: 14px;
  margin-top: ${Spacing.lg};
`;

const StyledLoginLink = styled.button`
  background: none;
  border: none;
  color: ${Colors.mutedText};
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  text-decoration: none;
  transition: text-decoration 0.3s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const PasswordStrengthMeter = styled.div`
  margin-bottom: ${Spacing.md};
`;

const StrengthBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${Colors.darkGray};
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: ${Spacing.sm};
`;

const StrengthFill = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background-color: ${props => {
    if (props.strength === 'weak') return Colors.errorRed;
    if (props.strength === 'medium') return '#ffa500';
    if (props.strength === 'strong') return '#4caf50';
    return Colors.darkGray;
  }};
  transition: all 0.3s ease;
`;

const StrengthText = styled.p`
  font-size: 12px;
  color: ${props => {
    if (props.strength === 'weak') return Colors.errorRed;
    if (props.strength === 'medium') return '#ffa500';
    if (props.strength === 'strong') return '#4caf50';
    return Colors.mutedText;
  }};
  margin: 0;
`;

const CheckItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacing.sm};
  font-size: 12px;
  color: ${props => props.met ? '#4caf50' : Colors.mutedText};
  margin-bottom: ${Spacing.sm};
`;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { signup } = useContext(AppContext);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const calculatePasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.length >= 12) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[!@#$%^&*()_+=\[\]{}';:"\\|,.<>/?-]/.test(pass)) strength++;

    if (strength <= 2) return { level: 'weak', width: 33 };
    if (strength <= 3) return { level: 'medium', width: 66 };
    return { level: 'strong', width: 100 };
  };

  const getPasswordChecks = (pass) => {
    return {
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /\d/.test(pass),
      special: /[!@#$%^&*()_+=\[\]{}';:"\\|,.<>/?-]/.test(pass)
    };
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    let isValid = true;

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    const strengthCheck = calculatePasswordStrength(password);
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (strengthCheck.level === 'weak') {
      setPasswordError('Password is too weak. Use at least 8 characters with uppercase, lowercase, number, and special character');
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    if (!isValid) return;

    setSubmitted(true);
    setTimeout(() => {
      signup(email, password);
      navigate('/discover');
    }, 500);
  };

  const passwordStrength = calculatePasswordStrength(password);
  const passwordChecks = getPasswordChecks(password);

  return (
    <SignUpContainer>
      <LogoImage src="/Pulse.jpg" alt="Pulse Logo" />
      <SignUpCard>
        <Title>CREATE AN ACCOUNT</Title>
        <DescriptionText>Find underground artists in your city and connect with like-minded listeners.</DescriptionText>

        <form onSubmit={handleSignUp}>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
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
            }}
            type="password"
            error={passwordError}
          />

          {password && (
            <>
              <PasswordStrengthMeter>
                <StrengthBar>
                  <StrengthFill width={passwordStrength.width} strength={passwordStrength.level} />
                </StrengthBar>
                <StrengthText strength={passwordStrength.level}>
                  Password Strength: {passwordStrength.level.charAt(0).toUpperCase() + passwordStrength.level.slice(1)}
                </StrengthText>
                <CheckItem met={passwordChecks.length}>
                  {passwordChecks.length ? <FiCheck size={14} /> : <FiX size={14} />}
                  At least 8 characters
                </CheckItem>
                <CheckItem met={passwordChecks.uppercase}>
                  {passwordChecks.uppercase ? <FiCheck size={14} /> : <FiX size={14} />}
                  Uppercase letter
                </CheckItem>
                <CheckItem met={passwordChecks.lowercase}>
                  {passwordChecks.lowercase ? <FiCheck size={14} /> : <FiX size={14} />}
                  Lowercase letter
                </CheckItem>
                <CheckItem met={passwordChecks.number}>
                  {passwordChecks.number ? <FiCheck size={14} /> : <FiX size={14} />}
                  Number
                </CheckItem>
                <CheckItem met={passwordChecks.special}>
                  {passwordChecks.special ? <FiCheck size={14} /> : <FiX size={14} />}
                  Special character
                </CheckItem>
              </PasswordStrengthMeter>
            </>
          )}

          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordError('');
            }}
            type="password"
            error={confirmPasswordError}
          />

          <Button
            primary
            fullWidth
            type="submit"
            disabled={submitted}
          >
            {submitted ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <Divider>or continue with</Divider>

        <GoogleButtonContainer>
          <GoogleSignInImage src="/googlesignin.jpg" alt="Google Sign In" />
        </GoogleButtonContainer>

        <TermsText>
          By clicking continue, you agree to our <button style={{background: 'none', border: 'none', color: Colors.mutedText, cursor: 'pointer', textDecoration: 'none', padding: 0}}>Terms of Service</button> and <button style={{background: 'none', border: 'none', color: Colors.mutedText, cursor: 'pointer', textDecoration: 'none', padding: 0}}>Privacy Policy</button>
        </TermsText>

        <LoginLink>
          Already have an account? <StyledLoginLink onClick={() => navigate('/login')}>Log in</StyledLoginLink>
        </LoginLink>
      </SignUpCard>
    </SignUpContainer>
  );
};

export default SignUp;

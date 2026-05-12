import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, Spacing } from '../styles/globalStyles';
import PageLayout from '../components/PageLayout';
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';

const SettingSection = styled.div`
  background-color: ${Colors.secondaryBg};
  border-radius: 12px;
  padding: ${Spacing.lg};
  margin-bottom: ${Spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  color: ${Colors.lightText};
  font-weight: 700;
  margin: 0 0 ${Spacing.lg} 0;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

const SettingLabel = styled.label`
  color: ${Colors.lightText};
  font-weight: 500;
  font-size: 14px;
`;

const SettingDescription = styled.p`
  color: ${Colors.mutedText};
  font-size: 12px;
  margin-top: ${Spacing.sm};
  margin-bottom: 0;
`;

const Toggle = styled.input`
  width: 50px;
  height: 28px;
  appearance: none;
  background: ${props => props.checked ? Colors.primary : Colors.darkGray};
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  outline: none;

  &:after {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: ${props => props.checked ? '24px' : '2px'};
    transition: all 0.3s ease;
  }
`;

const Select = styled.select`
  background-color: ${Colors.darkGray};
  color: ${Colors.lightText};
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${Spacing.sm} ${Spacing.md};
  border-radius: 6px;
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  cursor: pointer;

  option {
    background-color: ${Colors.secondaryBg};
    color: ${Colors.lightText};
  }

  &:focus {
    outline: none;
    border-color: ${Colors.primary};
  }
`;

const DangerButton = styled(Button)`
  background-color: ${Colors.errorRed};
  margin-top: ${Spacing.lg};

  &:hover {
    background-color: #d32f2f;
  }
`;

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [friendRequests, setFriendRequests] = useState('everyone');
  const [messages, setMessages] = useState(false);
  const { logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <PageLayout title="Settings">
      <SettingSection>
        <SectionTitle>Notifications</SectionTitle>
        <SettingItem>
          <div>
            <SettingLabel>Enable Notifications</SettingLabel>
            <SettingDescription>Receive notifications about new messages and activities</SettingDescription>
          </div>
          <Toggle
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
        </SettingItem>
      </SettingSection>

      <SettingSection>
        <SectionTitle>Privacy & Safety</SectionTitle>
        <SettingItem>
          <div>
            <SettingLabel>Who Can Send You Friend Requests</SettingLabel>
            <SettingDescription>Choose who can add you as a friend</SettingDescription>
          </div>
          <Select value={friendRequests} onChange={(e) => setFriendRequests(e.target.value)}>
            <option value="everyone">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="nobody">Nobody</option>
          </Select>
        </SettingItem>

        <SettingItem>
          <div>
            <SettingLabel>Accept Messages from Non-Followers</SettingLabel>
            <SettingDescription>Allow people you don't follow to message you</SettingDescription>
          </div>
          <Toggle
            type="checkbox"
            checked={messages}
            onChange={(e) => setMessages(e.target.checked)}
          />
        </SettingItem>
      </SettingSection>

      <SettingSection>
        <SectionTitle>Account</SectionTitle>
        <DangerButton primary onClick={handleLogout}>
          Log Out
        </DangerButton>
      </SettingSection>
    </PageLayout>
  );
};

export default Settings;

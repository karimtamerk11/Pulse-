import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, Spacing } from '../styles/globalStyles';
import PageLayout from '../components/PageLayout';
import Button from '../components/Button';
import Input from '../components/Input';
import { AppContext } from '../context/AppContext';
import { FiUpload } from 'react-icons/fi';

const FormCard = styled.div`
  background-color: ${Colors.secondaryBg};
  border-radius: 12px;
  padding: ${Spacing.xl};
  max-width: 500px;
`;

const FormGroup = styled.div`
  margin-bottom: ${Spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  color: ${Colors.lightText};
  font-weight: 600;
  margin-bottom: ${Spacing.md};
  font-size: 14px;
`;

const ProfilePictureUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Spacing.lg};
`;

const AvatarPreview = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${Colors.accentPurple} 0%, ${Colors.primary} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.lightText};
  font-weight: 800;
  font-size: 48px;
  overflow: hidden;

  ${props => props.src && `
    background-image: url(${props.src});
    background-size: cover;
    background-position: center;
  `}
`;

const FileInputWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${Spacing.md};
  background-color: ${Colors.darkBg};
  border: 2px dashed ${Colors.primary};
  border-radius: 8px;
  padding: ${Spacing.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${Colors.lightText};
  font-weight: 500;

  &:hover {
    background-color: rgba(168, 85, 247, 0.1);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacing.md};
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: ${Colors.primary};
`;

const CheckboxLabel = styled.label`
  color: ${Colors.lightText};
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${Spacing.md};
  margin-top: ${Spacing.xl};

  button {
    flex: 1;
  }
`;

const SuccessMessage = styled.p`
  color: #4caf50;
  font-size: 14px;
  margin-top: ${Spacing.md};
  text-align: center;
`;

const EditProfile = () => {
  const { currentUser, updateUserProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '[Set Display Name]');
  const [publicArtists, setPublicArtists] = useState(currentUser?.publicArtists ?? true);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!displayName.trim()) {
      alert('Display name is required');
      return;
    }

    updateUserProfile({
      displayName,
      publicArtists,
      avatar: avatarPreview,
    });

    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => {
      navigate('/profile');
    }, 1500);
  };

  return (
    <PageLayout title="Edit Profile">
      <FormCard>
          <FormGroup>
            <Label>Profile Picture</Label>
            <ProfilePictureUpload>
              <AvatarPreview src={avatarPreview || currentUser?.avatar}>
                {!avatarPreview && !currentUser?.avatar && currentUser?.displayName?.charAt(0)}
              </AvatarPreview>
              <FileInputWrapper>
                <HiddenFileInput
                  id="avatar-input"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                <FileInputLabel htmlFor="avatar-input">
                  <FiUpload size={20} />
                  Upload Picture
                </FileInputLabel>
              </FileInputWrapper>
            </ProfilePictureUpload>
          </FormGroup>

          <FormGroup>
            <Label>Display Name</Label>
            <Input
              placeholder="Enter your display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              type="text"
            />
          </FormGroup>

          <FormGroup>
            <CheckboxGroup>
              <Checkbox
                id="public-artists"
                type="checkbox"
                checked={publicArtists}
                onChange={(e) => setPublicArtists(e.target.checked)}
              />
              <CheckboxLabel htmlFor="public-artists">
                Display my communities publicly
              </CheckboxLabel>
            </CheckboxGroup>
          </FormGroup>

          <ButtonGroup>
            <Button primary onClick={handleSave}>
              Save Changes
            </Button>
            <Button onClick={() => navigate('/profile')}>
              Cancel
            </Button>
          </ButtonGroup>

          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        </FormCard>
    </PageLayout>
  );
};

export default EditProfile;

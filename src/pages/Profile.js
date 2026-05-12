import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, Spacing } from '../styles/globalStyles';
import PageLayout from '../components/PageLayout';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';
import { FiChevronDown, FiTrash2, FiEdit2 } from 'react-icons/fi';

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${Spacing.xl};
  gap: ${Spacing.lg};

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const UserInfo = styled.div`
  display: flex;
  gap: ${Spacing.lg};
  align-items: flex-start;

  @media (max-width: 768px) {
    flex: 1 100%;
  }
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.h1`
  font-size: 28px;
  color: ${Colors.lightText};
  font-weight: 800;
  margin: 0 0 ${Spacing.sm} 0;
`;

const UserStats = styled.div`
  display: flex;
  gap: ${Spacing.lg};
  margin-top: ${Spacing.md};
  font-size: 14px;
  color: ${Colors.mutedText};
`;

const StatItem = styled.span`
  font-weight: 600;
  color: ${Colors.lightText};

  &::after {
    content: ' ';
    color: ${Colors.mutedText};
  }
`;

const EditButton = styled(Button)``;

const ContentArea = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${Spacing.lg};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const WallSection = styled.div`
  background-color: ${Colors.secondaryBg};
  border-radius: 12px;
  padding: ${Spacing.lg};
  overflow-y: auto;
  max-height: 600px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${Colors.primary};
    border-radius: 3px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: ${Spacing.md};
  margin-bottom: ${Spacing.lg};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Tab = styled.button`
  background: none;
  border: none;
  color: ${props => props.$active ? Colors.lightText : Colors.mutedText};
  padding: ${Spacing.md};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 3px solid ${props => props.$active ? Colors.primary : 'transparent'};
  margin-bottom: -1px;
  transition: all 0.3s ease;
  font-family: 'Almarai', sans-serif;

  &:hover {
    color: ${Colors.lightText};
  }
`;

const CreatePostButton = styled(Button)`
  width: 100%;
  margin-bottom: ${Spacing.lg};
`;

const CharacterCount = styled.p`
  font-size: 12px;
  color: ${Colors.mutedText};
  text-align: right;
  margin-top: ${Spacing.sm};
`;

const PostInput = styled.textarea`
  width: 100%;
  background-color: ${Colors.darkBg};
  color: ${Colors.lightText};
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${Spacing.md};
  border-radius: 6px;
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  margin-bottom: ${Spacing.md};

  &:focus {
    outline: none;
    border-color: ${Colors.primary};
  }
`;

const PrivacySelect = styled.select`
  background-color: ${Colors.darkBg};
  color: ${Colors.lightText};
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${Spacing.sm} ${Spacing.md};
  border-radius: 6px;
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: ${Spacing.md};

  option {
    background-color: ${Colors.secondaryBg};
    color: ${Colors.lightText};
  }

  &:focus {
    outline: none;
    border-color: ${Colors.primary};
  }
`;

const PostItem = styled.div`
  background-color: ${Colors.darkBg};
  padding: ${Spacing.md};
  border-radius: 8px;
  margin-bottom: ${Spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const PostContent = styled.div`
  flex: 1;
`;

const PostAuthor = styled.p`
  color: ${Colors.primary};
  font-weight: 600;
  font-size: 13px;
  margin: 0 0 ${Spacing.sm} 0;
`;

const PostText = styled.p`
  color: ${Colors.lightText};
  font-size: 14px;
  margin: 0 0 ${Spacing.sm} 0;
`;

const PostTime = styled.p`
  color: ${Colors.mutedText};
  font-size: 11px;
  margin: 0;
`;

const PostActions = styled.div`
  display: flex;
  gap: ${Spacing.sm};
  margin-left: ${Spacing.md};
`;

const PostActionButton = styled.button`
  background: none;
  border: none;
  color: ${Colors.mutedText};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${Spacing.sm};
  transition: all 0.3s ease;

  &:hover {
    color: ${Colors.primary};
  }
`;

const RightSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.lg};
`;

const SectionBox = styled.div`
  background-color: ${Colors.secondaryBg};
  border-radius: 12px;
  padding: ${Spacing.lg};
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: ${Colors.mutedText};
  text-transform: uppercase;
  margin: 0 0 ${Spacing.md} 0;
`;

const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${Spacing.md};
`;

const ArtistCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ArtistLabel = styled.p`
  font-size: 12px;
  color: ${Colors.lightText};
  margin-top: ${Spacing.sm};
  margin: 0;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  color: ${Colors.mutedText};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${Spacing.md};
  transition: all 0.3s ease;

  &:hover {
    color: ${Colors.primary};
  }
`;

const mockArtists = Array.from({ length: 6 }, (_, i) => ({ id: i + 1, name: 'Artist' }));

const Profile = () => {
  const { currentUser, userPosts, addPost, deletePost, updatePost, userArtists } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('createPost');
  const [postContent, setPostContent] = useState('');
  const [wallPrivacy, setWallPrivacy] = useState(currentUser?.wallPrivacy || 'public');
  const [editingPostId, setEditingPostId] = useState(null);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const handleCreatePost = () => {
    if (postContent.trim()) {
      if (editingPostId) {
        updatePost(editingPostId, postContent);
        setEditingPostId(null);
      } else {
        addPost({ content: postContent });
      }
      setPostContent('');
    }
  };

  const handleEditPost = (post) => {
    setEditingPostId(post.id);
    setPostContent(post.content);
  };

  const handleDeletePost = (postId) => {
    deletePost(postId);
  };

  const handleCancel = () => {
    setEditingPostId(null);
    setPostContent('');
  };

  return (
    <PageLayout>
      <ProfileHeader>
          <UserInfo>
            <Avatar size="150px" emoji={currentUser.avatar || '👤'} />
            <UserDetails>
              <UserName>{currentUser.displayName}</UserName>
              <UserStats>
                <StatItem>{currentUser.friends} Friends</StatItem>
                <StatItem>{currentUser.following} Following</StatItem>
                <StatItem>{userArtists.length} Communities</StatItem>
              </UserStats>
            </UserDetails>
          </UserInfo>
          <EditButton primary onClick={() => navigate('/edit-profile')}>Edit Profile</EditButton>
        </ProfileHeader>

        <ContentArea>
          <WallSection>
            <TabContainer>
              <Tab
                $active={activeTab === 'createPost'}
                onClick={() => setActiveTab('createPost')}
              >
                Create Post
              </Tab>
              <Tab
                $active={activeTab === 'wallOptions'}
                onClick={() => setActiveTab('wallOptions')}
              >
                Wall Options
              </Tab>
            </TabContainer>

            {activeTab === 'createPost' && (
              <div>
                <PostInput
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
                <CharacterCount>{postContent.length}/200</CharacterCount>
                <div style={{ display: 'flex', gap: `${Spacing.md}` }}>
                  <CreatePostButton primary fullWidth onClick={handleCreatePost}>
                    {editingPostId ? 'Update Post' : 'Create Post'}
                  </CreatePostButton>
                  {editingPostId && (
                    <Button onClick={handleCancel}>Cancel</Button>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'wallOptions' && (
              <div>
                <label style={{ color: Colors.lightText, fontWeight: '500', display: 'block', marginBottom: `${Spacing.md}` }}>
                  Who can post on your wall?
                </label>
                <PrivacySelect value={wallPrivacy} onChange={(e) => setWallPrivacy(e.target.value)}>
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Only Me</option>
                </PrivacySelect>
              </div>
            )}

            <div style={{ marginTop: Spacing.lg }}>
              <h3 style={{ color: Colors.lightText, fontSize: '16px', fontWeight: '700', margin: 0 }}>Wall</h3>
              {userPosts && userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <PostItem key={post.id}>
                    <PostContent>
                      <PostAuthor>{currentUser.displayName}</PostAuthor>
                      <PostText>{post.content}</PostText>
                      <PostTime>{post.timestamp}</PostTime>
                    </PostContent>
                    <PostActions>
                      <PostActionButton onClick={() => handleEditPost(post)}>
                        <FiEdit2 size={16} />
                      </PostActionButton>
                      <PostActionButton onClick={() => handleDeletePost(post.id)}>
                        <FiTrash2 size={16} />
                      </PostActionButton>
                    </PostActions>
                  </PostItem>
                ))
              ) : (
                <p style={{ color: Colors.mutedText, fontSize: '14px', marginTop: `${Spacing.md}` }}>
                  No posts yet. Create one to get started!
                </p>
              )}
            </div>
          </WallSection>

          <RightSidebar>
            <SectionBox>
              <SectionTitle>About Me</SectionTitle>
              <p style={{ fontSize: '14px', margin: 0 }}>{currentUser.bio}</p>
            </SectionBox>

            <SectionBox>
              <SectionTitle>My Communities</SectionTitle>
              {userArtists && userArtists.length > 0 ? (
                <>
                  <ArtistGrid>
                    {userArtists.slice(0, 6).map((artist) => (
                      <ArtistCard key={artist.id}>
                        <Avatar size="80px" />
                        <ArtistLabel>{artist.name || `Community ${artist.id}`}</ArtistLabel>
                      </ArtistCard>
                    ))}
                  </ArtistGrid>
                  {userArtists.length > 6 && (
                    <MoreButton>
                      <FiChevronDown size={20} />
                    </MoreButton>
                  )}
                </>
              ) : (
                <p style={{ fontSize: '14px', color: Colors.mutedText, margin: 0 }}>
                  No communities yet. Join one to see them here!
                </p>
              )}
            </SectionBox>
          </RightSidebar>
        </ContentArea>
    </PageLayout>
  );
};

export default Profile;

import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, Spacing } from '../styles/globalStyles';
import PageLayout from '../components/PageLayout';
import Button from '../components/Button';
import Input from '../components/Input';
import { AppContext } from '../context/AppContext';
import { FiTrash2 } from 'react-icons/fi';

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${Spacing.lg};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChatroomsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.md};
`;

const ChatroomItem = styled.button`
  background-color: ${props => props.$active ? Colors.primary : Colors.secondaryBg};
  border: none;
  color: ${Colors.lightText};
  padding: ${Spacing.md};
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  font-weight: 500;
  transition: all 0.3s ease;
  font-family: 'Almarai', sans-serif;

  &:hover {
    background-color: ${props => props.$active ? Colors.primary : Colors.darkGray};
  }
`;

const ChatBox = styled.div`
  background-color: ${Colors.secondaryBg};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  height: 600px;
  overflow: hidden;
`;

const ChatBoxHeader = styled.div`
  padding: ${Spacing.lg};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 18px;
  font-weight: 700;
  color: ${Colors.lightText};
`;

const MessagesList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${Spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${Spacing.md};

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

const Message = styled.div`
  background-color: ${Colors.darkBg};
  padding: ${Spacing.md};
  border-radius: 8px;
  word-wrap: break-word;
`;

const MessageAuthor = styled.div`
  color: ${Colors.primary};
  font-weight: 600;
  font-size: 12px;
  margin-bottom: ${Spacing.sm};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const MessageContent = styled.div`
  color: ${Colors.lightText};
  font-size: 14px;
`;

const MessageTime = styled.div`
  color: ${Colors.mutedText};
  font-size: 11px;
  margin-top: ${Spacing.sm};
`;

const DeleteMessageButton = styled.button`
  background: none;
  border: none;
  color: ${Colors.errorRed};
  cursor: pointer;
  padding: ${Spacing.sm};
  opacity: 0;
  transition: all 0.3s ease;
  font-size: 12px;

  ${Message}:hover & {
    opacity: 1;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ChatInputBox = styled.div`
  padding: ${Spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: ${Spacing.md};
`;

const MessageInput = styled(Input)`
  flex: 1;
`;

const SendButton = styled(Button)`
  padding: ${Spacing.md} ${Spacing.lg};
`;

const ArtistHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacing.lg};
  margin-bottom: ${Spacing.xl};
  padding: ${Spacing.lg};
  background-color: ${Colors.secondaryBg};
  border-radius: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ArtistImage = styled.div`
  width: 150px;
  height: 150px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  flex-shrink: 0;
  background-image: url("${props => props.$image}");
`;

const ArtistInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.md};

  h2 {
    font-size: 28px;
    color: ${Colors.lightText};
    margin: 0;
  }

  p {
    color: ${Colors.mutedText};
    margin: 0;
  }
`;

const JoinButtonContainer = styled.div`
  display: flex;
  gap: ${Spacing.md};
`;

const ArtistCommunity = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const { currentUser, addFriend, addArtist, removeArtist, isUserMemberOfCommunity } = useContext(AppContext);
  const [activeChat, setActiveChat] = useState('general');

  // Artists data with images
  const artists = [
    { id: 1, name: 'The Weeknd', image: 'https://preview.redd.it/you-guys-remember-when-people-actually-thought-he-did-this-v0-amp4c397yxmc1.jpeg?auto=webp&s=a7f0c89ca2d024bdca1c56aaad124d3bd34d3937' },
    { id: 2, name: 'Juice WRLD', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTymtkkG3Mxg2iccje2OPrdub5cDWED5vHh9A&s' },
    { id: 3, name: 'Michael Jackson', image: 'https://i.pinimg.com/236x/3a/87/4d/3a874defbd20095e889e486a242a91de.jpg' },
    { id: 4, name: 'Eminem', image: 'https://preview.redd.it/choose-your-cursed-eminem-v0-4n4o0rrnw5rg1.jpg?width=557&format=pjpg&auto=webp&s=f282cd20c03f117444662a40398d85ef69a6e797' },
    { id: 5, name: 'Kendrick Lamar', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS85r1025td52AKV3x9arSk0m3ULQp7GMNXvg&s' },
    { id: 6, name: 'Drake', image: 'https://i.pinimg.com/736x/ee/05/1b/ee051b979e7fea90e236b0557e534821.jpg' },
    { id: 7, name: 'Billie Eilish', image: 'https://townsquare.media/site/252/files/2024/05/attachment-Billie-Eilish.jpg?w=300&q=75' },
    { id: 8, name: 'Sombr', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkKpoTJ-r5STXpssx4ulxlDzno_3DuEQzg6Q&s' },
    { id: 9, name: 'Taylor Swift', image: 'https://i.pinimg.com/564x/0f/a5/53/0fa553298f5cde0dbdb21dcac7272bec.jpg' },
    { id: 10, name: 'Tame Impala', image: 'https://media.tenor.com/Qzljd4nCmCwAAAAe/saul-goodman-tame-impala.png' },
    { id: 11, name: 'Ariana Grande', image: 'https://i.redd.it/imagine-if-ariana-joins-this-reddit-and-sees-what-nonsense-v0-6fy4xkfpltze1.jpg?width=640&format=pjpg&auto=webp&s=20c121bd7e3ff91d19631f750d7da21cffb97bc2' },
    { id: 12, name: 'Linkin Park', image: 'https://i1.sndcdn.com/artworks-000421407825-s7djcc-t500x500.jpg' },
  ];

  // Get current artist
  const currentArtist = artists.find(artist => artist.id === parseInt(artistId));
  const [userMessages, setUserMessages] = useState({
    general: [
      {
        id: 1,
        author: 'Test User',
        userId: 'mockUser123',
        content: 'Hey everyone! Welcome to the community!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ],
    concerts: [],
    music: [],
  });
  const [messageInput, setMessageInput] = useState('');

  // Mock chatrooms for the first artist
  const chatrooms = {
    general: { name: 'General', messages: [] },
    concerts: { name: 'Concerts', messages: [] },
    music: { name: 'Music Discussions', messages: [] },
  };

  const handleSendMessage = () => {
    const parsedArtistId = parseInt(artistId);
    if (!isUserMemberOfCommunity(parsedArtistId)) {
      alert('You must join the community first to send messages!');
      return;
    }

    if (!currentUser?.displayName || currentUser.displayName === '[Set Display Name]') {
      alert('Please set a display name before sending messages. Go to Edit Profile to set your display name.');
      return;
    }
    
    if (messageInput.trim() && currentUser) {
      const newMessage = {
        id: Date.now(),
        author: currentUser.displayName,
        userId: currentUser.id,
        content: messageInput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setUserMessages({
        ...userMessages,
        [activeChat]: [...(userMessages[activeChat] || []), newMessage],
      });

      setMessageInput('');
    }
  };

  const handleDeleteMessage = (messageId) => {
    setUserMessages({
      ...userMessages,
      [activeChat]: userMessages[activeChat].filter(m => m.id !== messageId),
    });
  };

  const handleAuthorClick = (author, userId) => {
    if (author === 'Test User') return;
    
    // Navigate to user profile (if not a test user)
    navigate(`/profile/${userId}`);
  };

  const currentMessages = userMessages[activeChat] || [];

  return (
    <PageLayout title="Artist Community">
      {currentArtist && (
        <ArtistHeader>
          <ArtistImage $image={currentArtist.image} />
          <ArtistInfo>
            <h2>{currentArtist.name}</h2>
            <p>Join the community and connect with fans!</p>
            <JoinButtonContainer>
              {isUserMemberOfCommunity(currentArtist.id) ? (
                <Button 
                  onClick={() => removeArtist(currentArtist.id)}
                >
                  Leave Community
                </Button>
              ) : (
                <Button 
                  primary
                  onClick={() => addArtist(currentArtist)}
                >
                  Join Community
                </Button>
              )}
            </JoinButtonContainer>
          </ArtistInfo>
        </ArtistHeader>
      )}
      <Content>
          <ChatroomsList>
            {Object.entries(chatrooms).map(([key, room]) => (
              <ChatroomItem
                key={key}
                $active={activeChat === key}
                onClick={() => setActiveChat(key)}
              >
                {room.name}
              </ChatroomItem>
            ))}
          </ChatroomsList>

          <ChatBox>
            <ChatBoxHeader>{chatrooms[activeChat].name}</ChatBoxHeader>
            <MessagesList>
              {currentMessages.length === 0 ? (
                <Message style={{ opacity: 0.5 }}>No messages yet. Start a conversation!</Message>
              ) : (
                currentMessages.map((message) => (
                  <MessageWrapper key={message.id}>
                    <Message style={{ flex: 1 }}>
                      <MessageAuthor onClick={() => handleAuthorClick(message.author, message.userId)}>
                        {message.author}
                      </MessageAuthor>
                      <MessageContent>{message.content}</MessageContent>
                      <MessageTime>{message.timestamp}</MessageTime>
                    </Message>
                    {message.userId === currentUser?.id && (
                      <DeleteMessageButton onClick={() => handleDeleteMessage(message.id)}>
                        <FiTrash2 size={16} />
                      </DeleteMessageButton>
                    )}
                  </MessageWrapper>
                ))
              )}
            </MessagesList>

            <ChatInputBox>
              <MessageInput
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <SendButton primary onClick={handleSendMessage}>
                Send
              </SendButton>
            </ChatInputBox>
          </ChatBox>
        </Content>
    </PageLayout>
  );
};

export default ArtistCommunity;

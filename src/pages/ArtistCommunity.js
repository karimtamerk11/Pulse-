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

const ArtistCommunity = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const { currentUser, addFriend } = useContext(AppContext);
  const [activeChat, setActiveChat] = useState('general');
  const [userMessages, setUserMessages] = useState({
    general: [
      {
        id: 1,
        author: 'Click Me',
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
    if (author !== 'Click Me') return;
    
    // Create a mock profile for "Click Me"
    const mockFriend = {
      id: userId,
      displayName: author,
      email: `${author}@example.com`,
      bio: 'A passionate music fan!',
      avatar: null,
      friends: 5,
      following: 10,
      artists: 2,
    };

    // Add as friend
    addFriend(mockFriend);
    navigate(`/profile/${userId}`);
  };

  const currentMessages = userMessages[activeChat] || [];

  return (
    <PageLayout title="Artist Community">
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

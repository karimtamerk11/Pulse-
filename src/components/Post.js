import styled from 'styled-components';
import { Colors, Spacing } from '../styles/globalStyles';
import Avatar from './Avatar';

export const PostContainer = styled.div`
  background-color: ${Colors.secondaryBg};
  border-radius: 8px;
  padding: ${Spacing.md};
  margin-bottom: ${Spacing.md};
  display: flex;
  gap: ${Spacing.md};
`;

export const PostContent = styled.div`
  flex: 1;
`;

export const PostTime = styled.p`
  color: ${Colors.mutedText};
  font-size: 12px;
  margin: 0;
  margin-bottom: ${Spacing.sm};
`;

export const PostAuthor = styled.p`
  color: ${Colors.lightText};
  font-weight: 600;
  margin: 0;
  margin-bottom: ${Spacing.sm};
`;

export const PostText = styled.p`
  color: ${Colors.lightText};
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
`;

const Post = ({ author, time, content }) => {
  return (
    <PostContainer>
      <Avatar size="40px" />
      <PostContent>
        <PostTime>{time}</PostTime>
        <PostAuthor>{author}</PostAuthor>
        <PostText>{content}</PostText>
      </PostContent>
    </PostContainer>
  );
};

export default Post;

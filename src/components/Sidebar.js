import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Colors, Spacing } from '../styles/globalStyles';
import { FiHome, FiUser, FiMessageCircle, FiSettings, FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const SidebarContainer = styled.div`
  width: 200px;
  background-color: #181218;
  padding: ${Spacing.lg};
  display: flex;
  flex-direction: column;
  height: 100vh;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 60px;
    padding: ${Spacing.md};
  }

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
    position: relative;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${Spacing.xl};
  text-decoration: none;

  img {
    height: 35px;
    width: auto;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    justify-content: center;
    
    img {
      height: 40px;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: ${Spacing.md};
    
    img {
      height: 40px;
    }
  }
`;

export const NavMenu = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${Spacing.md};
`;

export const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${Spacing.md};
  padding: ${Spacing.md};
  background-color: ${props => props.$active ? Colors.primary : 'transparent'};
  color: ${Colors.lightText};
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background-color: ${props => props.$active ? Colors.primary : Colors.secondaryBg};
  }

  @media (max-width: 768px) {
    justify-content: center;
    padding: ${Spacing.md};
    
    span {
      display: none;
    }
  }

  @media (max-width: 480px) {
    display: inline-flex;
    padding: ${Spacing.sm};
    gap: ${Spacing.sm};
    margin-right: ${Spacing.md};

    span {
      display: inline;
    }
  }
`;

export const SectionTitle = styled.p`
  font-size: 12px;
  color: ${Colors.mutedText};
  text-transform: uppercase;
  font-weight: 700;
  margin-top: ${Spacing.lg};
  margin-bottom: ${Spacing.md};
  padding: 0 ${Spacing.md};

  @media (max-width: 768px) {
    display: none;
  }
`;

export const CommunityItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${Spacing.md};
  padding: ${Spacing.md};
  color: ${Colors.lightText};
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    background-color: ${Colors.secondaryBg};
  }

  .indicator {
    width: 8px;
    height: 8px;
    background-color: ${Colors.primary};
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    justify-content: center;
    gap: 0;

    span {
      display: none;
    }
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${Spacing.md};
  padding: ${Spacing.md};
  background: none;
  border: none;
  color: ${Colors.lightText};
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
  font-family: 'Almarai', sans-serif;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: ${Colors.secondaryBg};
  }

  @media (max-width: 768px) {
    justify-content: center;
    gap: 0;
    
    span {
      display: none;
    }
  }
`;

const Sidebar = () => {
  const location = useLocation();
  const { logout, userArtists, userFriends } = useContext(AppContext);

  const isActive = (path) => location.pathname === path;

  return (
    <SidebarContainer>
      <Logo to="/discover">
        <img src="/Pulse.jpg" alt="Pulse Logo" />
      </Logo>

      <NavMenu>
        <NavItem to="/discover" $active={isActive('/discover')}>
          <FiHome size={20} />
          <span>Home</span>
        </NavItem>
        <NavItem to="/profile" $active={isActive('/profile')}>
          <FiUser size={20} />
          <span>Profile</span>
        </NavItem>
      </NavMenu>

      {userArtists && userArtists.length > 0 && (
        <>
          <SectionTitle>Communities</SectionTitle>
          {userArtists.slice(0, 4).map((artist, idx) => (
            <CommunityItem to={`/artist-community/${artist.id}`} key={idx}>
              <span className="indicator"></span>
              <span>{artist.name}</span>
            </CommunityItem>
          ))}
        </>
      )}

      {userFriends && userFriends.length > 0 && (
        <>
          <SectionTitle>Friends</SectionTitle>
          {userFriends.slice(0, 4).map((friend, idx) => (
            <CommunityItem to={`/profile/${friend.id}`} key={idx}>
              <FiMessageCircle size={16} />
              <span>{friend.displayName}</span>
            </CommunityItem>
          ))}
        </>
      )}

      <NavItem to="/settings" $active={isActive('/settings')} style={{ marginTop: 'auto' }}>
        <FiSettings size={20} />
        <span>Settings</span>
      </NavItem>

      <LogoutButton onClick={logout}>
        <FiLogOut size={20} />
        <span>Logout</span>
      </LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;

import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [allConcerts, setAllConcerts] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [userArtists, setUserArtists] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedAllUsers = localStorage.getItem('allUsers');
    const savedTickets = localStorage.getItem('tickets');
    const savedConcerts = localStorage.getItem('allConcerts');
    const savedFriends = localStorage.getItem('userFriends');
    const savedArtists = localStorage.getItem('userArtists');
    const savedPosts = localStorage.getItem('userPosts');

    if (savedAllUsers) {
      setAllUsers(JSON.parse(savedAllUsers));
    }

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }

    if (savedTickets) setTickets(JSON.parse(savedTickets));
    if (savedConcerts) setAllConcerts(JSON.parse(savedConcerts));
    if (savedFriends) setUserFriends(JSON.parse(savedFriends));
    if (savedArtists) setUserArtists(JSON.parse(savedArtists));
    if (savedPosts) setUserPosts(JSON.parse(savedPosts));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    if (currentUser) localStorage.setItem('currentUser', JSON.stringify(currentUser));
    else localStorage.removeItem('currentUser');
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('allConcerts', JSON.stringify(allConcerts));
  }, [allConcerts]);

  useEffect(() => {
    localStorage.setItem('userFriends', JSON.stringify(userFriends));
  }, [userFriends]);

  useEffect(() => {
    localStorage.setItem('userArtists', JSON.stringify(userArtists));
  }, [userArtists]);

  useEffect(() => {
    localStorage.setItem('userPosts', JSON.stringify(userPosts));
  }, [userPosts]);

  const signup = (email, password, displayName = '[Set Display Name]') => {
    // Check if user already exists
    const existingUser = allUsers.find(u => u.email === email);
    if (existingUser) {
      return false; // User already exists
    }

    const newUser = {
      id: Date.now(),
      email,
      password,
      displayName,
      bio: 'No bio added.',
      friends: 0,
      following: 0,
      artists: 0,
      avatar: null,
      wallPrivacy: 'public',
      publicArtists: true,
      acceptMessages: false,
      notificationsEnabled: true
    };
    
    // Add to allUsers list
    setAllUsers([...allUsers, newUser]);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setUserFriends([]);
    setUserArtists([]);
    setUserPosts([]);
    return true;
  };

  const login = (email, password) => {
    // Search through allUsers for matching email and password
    const user = allUsers.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const updateUserProfile = (updates) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
    }
  };

  const addToTickets = (concert) => {
    const existingTicket = tickets.find(t => t.id === concert.id);
    if (existingTicket) {
      setTickets(tickets.map(t => 
        t.id === concert.id ? { ...t, quantity: t.quantity + 1 } : t
      ));
    } else {
      setTickets([...tickets, { ...concert, quantity: 1 }]);
    }
  };

  const removeFromTickets = (concertId) => {
    setTickets(tickets.filter(t => t.id !== concertId));
  };

  const updateTicketQuantity = (concertId, quantity) => {
    if (quantity <= 0) {
      removeFromTickets(concertId);
    } else {
      setTickets(tickets.map(t =>
        t.id === concertId ? { ...t, quantity } : t
      ));
    }
  };

  const clearTickets = () => {
    setTickets([]);
  };

  const addFriend = (friend) => {
    if (!userFriends.find(f => f.id === friend.id)) {
      setUserFriends([...userFriends, friend]);
      if (currentUser) {
        updateUserProfile({ friends: currentUser.friends + 1 });
      }
    }
  };

  const removeFriend = (friendId) => {
    setUserFriends(userFriends.filter(f => f.id !== friendId));
    if (currentUser) {
      updateUserProfile({ friends: currentUser.friends - 1 });
    }
  };

  const addArtist = (artist) => {
    if (!userArtists.find(a => a.id === artist.id)) {
      setUserArtists([...userArtists, artist]);
      if (currentUser) {
        updateUserProfile({ artists: currentUser.artists + 1 });
      }
    }
  };

  const removeArtist = (artistId) => {
    setUserArtists(userArtists.filter(a => a.id !== artistId));
    if (currentUser) {
      updateUserProfile({ artists: currentUser.artists - 1 });
    }
  };

  const addPost = (post) => {
    setUserPosts([{ ...post, id: Date.now(), timestamp: new Date().toLocaleString() }, ...userPosts]);
  };

  const deletePost = (postId) => {
    setUserPosts(userPosts.filter(p => p.id !== postId));
  };

  const updatePost = (postId, updatedContent) => {
    setUserPosts(userPosts.map(p =>
      p.id === postId ? { ...p, content: updatedContent } : p
    ));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthenticated,
        setIsAuthenticated,
        signup,
        login,
        logout,
        updateUserProfile,
        allUsers,
        setAllUsers,
        tickets,
        addToTickets,
        removeFromTickets,
        updateTicketQuantity,
        clearTickets,
        allConcerts,
        setAllConcerts,
        userFriends,
        addFriend,
        removeFriend,
        userArtists,
        addArtist,
        removeArtist,
        userPosts,
        addPost,
        deletePost,
        updatePost
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

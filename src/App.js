import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyles } from './styles/globalStyles';
import { AppProvider, AppContext } from './context/AppContext';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Discover from './pages/Discover';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Concerts from './pages/Concerts';
import Tickets from './pages/Tickets';
import Artists from './pages/Artists';
import ArtistCommunity from './pages/ArtistCommunity';
import EditProfile from './pages/EditProfile';

function AppContent() {
  const { isAuthenticated } = useContext(AppContext);

  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/discover" /> : <Navigate to="/login" />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/discover" />} />
        <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/discover" />} />
        <Route path="/discover" element={isAuthenticated ? <Discover /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
        <Route path="/concerts" element={isAuthenticated ? <Concerts /> : <Navigate to="/login" />} />
        <Route path="/tickets" element={isAuthenticated ? <Tickets /> : <Navigate to="/login" />} />
        <Route path="/artists" element={isAuthenticated ? <Artists /> : <Navigate to="/login" />} />
        <Route path="/artist-community/:artistId" element={isAuthenticated ? <ArtistCommunity /> : <Navigate to="/login" />} />
        <Route path="/edit-profile" element={isAuthenticated ? <EditProfile /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;

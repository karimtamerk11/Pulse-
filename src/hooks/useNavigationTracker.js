import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export const useNavigationTracker = () => {
  const location = useLocation();
  const { addToNavigationHistory, isAuthenticated } = useContext(AppContext);

  useEffect(() => {
    // Only track navigation for authenticated users and after login/signup pages
    if (isAuthenticated && location.pathname !== '/login' && location.pathname !== '/signup') {
      addToNavigationHistory(location.pathname);
    }
  }, [location.pathname, isAuthenticated, addToNavigationHistory]);
};

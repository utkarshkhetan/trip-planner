import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Layout } from './components/Layout/Layout';
import { FlightsPage } from './pages/FlightsPage';
import { AccommodationPage } from './pages/AccommodationPage';
import { ItineraryPage } from './pages/ItineraryPage';
import { ExpensesPage } from './pages/ExpensesPage';
import { QuotesPage } from './pages/QuotesPage';
import { SplashScreen } from './components/SplashScreen';
import { useNotificationPermission } from './hooks/useNotificationPermission';
import { useEventNotifications } from './hooks/useEventNotifications';
import './lib/seedDatabase'; // Makes seedDatabase available globally
import './lib/testFirebase'; // Makes testFirebase available globally
import './lib/addArrivalEvents'; // Makes addArrivalEvents available globally

function App() {
  // Notification setup
  const { permission, requestPermission, isGranted } = useNotificationPermission();

  // Enable event notifications once permission is granted
  useEventNotifications(isGranted);

  // Request notification permission after splash screen
  useEffect(() => {
    if (permission === 'default') {
      // Wait a bit after app loads, then request
      const timer = setTimeout(() => {
        requestPermission();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [permission, requestPermission]);

  // Initialize state based on session storage to prevent flash
  const [showSplash, setShowSplash] = useState(() => {
    // For testing/development, we want to see it every time. 
    // Uncomment the next line to enable "once per session" behavior
    // return !sessionStorage.getItem('splashShown');
    return true;
  });

  // Check if splash has been shown in this session
  /* useEffect(() => {
    const splashShown = sessionStorage.getItem('splashShown');
    if (splashShown) {
      setShowSplash(false);
    }
  }, []); */

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashShown', 'true');
    setShowSplash(false);
  };

  return (
    <BrowserRouter basename="/trip-planner">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        ) : (
          <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/flights" replace />} />
                <Route path="flights" element={<FlightsPage />} />
                <Route path="accommodation" element={<AccommodationPage />} />
                <Route path="itinerary" element={<ItineraryPage />} />
                <Route path="expenses" element={<ExpensesPage />} />
                <Route path="quotes" element={<QuotesPage />} />
              </Route>
            </Routes>
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;

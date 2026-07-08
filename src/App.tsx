import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LangProvider } from './context/LangContext';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Works from './pages/Works';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<><Navbar /><Home /></>} />
      <Route path="/works" element={<Works />} />
    </Routes>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const handleDone = useCallback(() => setLoaded(true), []);

  return (
    <LangProvider>
      <BrowserRouter>
        {!loaded && <LoadingScreen onDone={handleDone} />}
        <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
          <AppRoutes />
        </div>
      </BrowserRouter>
    </LangProvider>
  );
}

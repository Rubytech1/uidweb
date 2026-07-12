import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LangProvider } from './context/LangContext';
import { AuthProvider } from './context/AuthContext';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Works from './pages/Works';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import AuthGuard from './components/auth/AuthGuard';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<><Navbar /><Home /></>} />
      <Route path="/works" element={<Works />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
    </Routes>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const handleDone = useCallback(() => setLoaded(true), []);

  return (
    <LangProvider>
      <AuthProvider>
        <BrowserRouter>
          {!loaded && <LoadingScreen onDone={handleDone} />}
          <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
            <AppRoutes />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </LangProvider>
  );
}

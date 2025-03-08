import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import HomePage from './pages/homePage';
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <LoginPage setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/home" />} />
            <Route path="/signup" element={!isAuthenticated ? <SignupPage setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/home" />} />
            <Route path="/home" element={isAuthenticated ? <HomePage setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;

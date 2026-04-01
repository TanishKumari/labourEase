import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ ADD THIS LINE
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { UserProvider } from './context/UserContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ WRAP EVERYTHING INSIDE THIS */}
      <AuthProvider>
        <UserProvider>
          <BookingProvider>
            <App />
          </BookingProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

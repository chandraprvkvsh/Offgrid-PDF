import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen bg-dark text-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
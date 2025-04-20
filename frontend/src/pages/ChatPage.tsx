import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import ChatInterface from '../components/ChatInterface';

const ChatPage: React.FC = () => {
  const { state } = useAppContext();

  // If no PDF has been uploaded, redirect to the home page
  if (!state.pdfUploaded) {
    return <Navigate to="/" replace />;
  }

  return <ChatInterface />;
};

export default ChatPage;
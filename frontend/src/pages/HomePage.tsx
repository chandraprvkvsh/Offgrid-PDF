import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import PdfUpload from '../components/PdfUpload';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  const { state } = useAppContext();

  // If PDF is already uploaded, redirect to chat page
  if (state.pdfUploaded) {
    return <Navigate to="/chat" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-dark text-white">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
            Upload a PDF to Start Chatting
          </span>
        </h1>
        <PdfUpload />
        
        <div className="mt-12 max-w-md text-center">
          <h3 className="text-lg font-medium mb-4 text-gray-300">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-dark-lighter p-4 rounded-lg shadow-md border border-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              <p className="text-gray-300">Intelligent document analysis</p>
            </div>
            <div className="bg-dark-lighter p-4 rounded-lg shadow-md border border-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              <p className="text-gray-300">Natural conversation interface</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const Header: React.FC = () => {
  const { resetChat, resetPdfState, state } = useAppContext();
  const navigate = useNavigate();

  const handleNewChat = async () => {
    await resetChat();
  };

  const handleUploadNew = async () => {
    // Reset both chat and PDF state before navigating
    await resetChat();
    await resetPdfState();
    navigate('/');
  };

  return (
    <header className="bg-dark-light text-white py-4 shadow-md border-b border-dark-lighter">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
          PDF Chat
        </h1>
        <div className="flex space-x-3">
          {state.pdfUploaded && (
            <button
              onClick={handleNewChat}
              className="btn bg-dark-lighter hover:bg-dark-light text-white border border-gray-600 hover:border-primary px-4 py-2 rounded-md font-medium transition-all duration-200 hover:shadow-neon"
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New Chat
              </span>
            </button>
          )}
          <button
            onClick={handleUploadNew}
            className="btn bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium transition-all duration-200 hover:shadow-md"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              Upload New PDF
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
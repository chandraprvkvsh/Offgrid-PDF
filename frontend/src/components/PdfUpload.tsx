import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import LoadingIndicator from './LoadingIndicator';

const PdfUpload: React.FC = () => {
  const { uploadPdf, state } = useAppContext();
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (file: File) => {
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a PDF file');
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const success = await uploadPdf(selectedFile);
        if (success) {
          navigate('/chat');
        }
      } catch (error) {
        console.error('Upload handler error:', error);
        // Error is already handled in the context
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div 
        className={`border-2 border-dashed rounded-lg p-10 text-center ${
          dragActive ? 'border-primary bg-dark-lighter shadow-md' : 'border-gray-600'
        } ${state.isUploading ? 'opacity-50' : ''} transition-all duration-300 hover:border-primary`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {state.isUploading ? (
          <LoadingIndicator message="Uploading PDF..." size="large" />
        ) : (
          <>
            <div className="mb-6 transform transition-transform duration-500 hover:scale-110">
              <svg
                className="mx-auto h-16 w-16 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-xl font-medium mb-2 text-white">Drag & drop your PDF file here</p>
            <p className="text-sm text-gray-400 mb-6">or click to browse files</p>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={handleInputChange}
              disabled={state.isUploading}
            />
            <button
              type="button"
              onClick={handleButtonClick}
              className="bg-dark-lighter hover:bg-dark-light text-white font-medium py-3 px-6 rounded-md transition duration-300 border border-gray-600 hover:border-primary transform hover:scale-105 hover:shadow-md"
              disabled={state.isUploading}
            >
              <span className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Select PDF
              </span>
            </button>
            
            {selectedFile && (
              <div className="mt-6 bg-dark-lighter p-4 rounded-lg border border-gray-700 transition-all duration-300 hover:border-primary">
                <p className="text-sm text-gray-300 mb-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{selectedFile.name}</span>
                </p>
                <button
                  onClick={handleUpload}
                  className="bg-primary hover:bg-primary-light text-white font-medium py-2 px-6 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg w-full"
                  disabled={state.isUploading}
                >
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                    Upload and Start Chat
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      {state.uploadError && (
        <div className="mt-4 p-4 bg-red-900 border border-red-700 text-red-100 rounded-md shadow-md animate-pulse">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {state.uploadError}
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfUpload;
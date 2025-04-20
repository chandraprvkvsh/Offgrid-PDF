import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import LoadingIndicator from './LoadingIndicator';
import ChatMessage from './ChatMessage';
import Header from './Header';

const ChatInterface: React.FC = () => {
  const { state, sendMessage } = useAppContext();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [state.chatHistory]);

  // Auto resize textarea as user types
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
    }
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || state.isLoadingChat) return;

    const message = inputValue.trim();
    setInputValue('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    await sendMessage(message);
  };

  return (
    <div className="flex flex-col h-screen bg-dark text-white">
      <Header />
      
      <div className="flex-grow flex flex-col overflow-hidden">
        {/* Chat messages area */}
        <div className="flex-grow overflow-y-auto p-4 bg-dark">
          {state.chatHistory.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center p-8 bg-dark-lighter rounded-lg max-w-md border border-dark-light shadow-lg transition-all duration-300 hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse-slow" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                <h2 className="text-xl font-medium mb-3 text-white">Your PDF is ready</h2>
                <p className="mb-4 text-gray-300">Start asking questions about your document.</p>
                <div className="p-3 bg-dark-light rounded-md text-sm text-gray-300 mb-2">
                  <p className="mb-1 font-medium">Try asking:</p>
                  <p className="text-primary hover:text-primary-light cursor-pointer transition-colors">
                    "Summarize the key points in this document"
                  </p>
                </div>
                <div className="p-3 bg-dark-light rounded-md text-sm text-gray-300">
                  <p className="mb-1 font-medium">Or:</p>
                  <p className="text-primary hover:text-primary-light cursor-pointer transition-colors">
                    "What are the main ideas discussed?"
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {state.chatHistory.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        
          {/* Loading indicator */}
          {state.isLoadingChat && (
            <div className="mt-4 max-w-4xl mx-auto">
              <LoadingIndicator size="small" message="AI is processing your question..." />
            </div>
          )}
        
          {/* Error message */}
          {state.chatError && (
            <div className="p-4 mt-4 bg-red-900 border border-red-700 text-red-100 rounded-md max-w-4xl mx-auto shadow-md">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {state.chatError}
              </div>
            </div>
          )}
        </div>
        
        {/* Input area */}
        <div className="border-t border-dark-lighter p-4 bg-dark-light">
          <form onSubmit={handleSubmit} className="flex items-end max-w-4xl mx-auto">
            <div className="flex-grow bg-dark-lighter rounded-lg shadow-inner-lg relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Ask a question about your PDF..."
                className="w-full bg-dark-lighter border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[44px] max-h-[160px] resize-none text-white placeholder-gray-400"
                disabled={state.isLoadingChat}
                rows={1}
              />
            </div>
            <button
              type="submit"
              disabled={inputValue.trim() === '' || state.isLoadingChat}
              className={`ml-3 p-3 rounded-full h-12 w-12 flex items-center justify-center transition-all duration-300 ${
                inputValue.trim() === '' || state.isLoadingChat
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-light hover:shadow-md transform hover:scale-105'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 28.897 0 003.105 2.289z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
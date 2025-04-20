import React from 'react';
import { Message } from '../hooks/useChat';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.type === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} slide-in`}>
      <div 
        className={`max-w-[80%] rounded-lg p-4 shadow-md ${
          isUser 
            ? 'bg-primary text-white rounded-tr-none border-t border-r border-primary-light' 
            : 'bg-dark-lighter text-gray-100 rounded-tl-none border-t border-l border-gray-700'
        } transition-all duration-300 hover:shadow-lg`}
      >
        {!isUser && (
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 rounded-full bg-primary-dark flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-gray-400">AI Assistant</span>
          </div>
        )}
        
        <div className="text-sm whitespace-pre-wrap leading-relaxed">
          {message.content}
        </div>
        
        <div className={`text-xs mt-2 flex justify-between items-center ${isUser ? 'text-blue-200' : 'text-gray-400'}`}>
          <span>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {isUser && (
            <div className="flex items-center">
              <span className="text-xs font-semibold mr-1">You</span>
              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-dark" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
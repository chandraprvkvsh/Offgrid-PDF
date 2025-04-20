import { useState } from 'react';
import { sendMessage as sendMessageService } from '../services/chatService';

// Define our local Message type
export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

// Update API response type to match the backend
interface MessageResponse {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
}

export const useChat = () => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const sendMessage = async (messageContent: string): Promise<void> => {
    // Add user message to chat history
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    };

    setChatHistory(prevHistory => [...prevHistory, userMessage]);
    setIsLoading(true);
    setChatError(null);

    try {
      // Send message to server
      const response = await sendMessageService(messageContent);
      
      // Transform API response to our local Message format
      // Note: we're using the answer field now instead of content
      const botMessage: Message = {
        id: response.id || (Date.now() + 1).toString(),
        type: 'bot',
        content: response.answer || "I didn't understand that. Please try again.",
        timestamp: new Date(response.timestamp || Date.now())
      };

      // Add the bot message to chat history
      setChatHistory(prevHistory => [...prevHistory, botMessage]);
      setIsLoading(false);
    } catch (error) {
      setChatError('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setChatHistory([]);
    setChatError(null);
  };

  return {
    chatHistory,
    isLoading,
    chatError,
    sendMessage,
    resetChat
  };
};
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { uploadPdf as uploadPdfService } from '../services/pdfService';
import { useChat, Message } from '../hooks/useChat';
import { clearChatHistory } from '../services/chatService';

interface AppState {
  isUploading: boolean;
  uploadError: string | null;
  pdfUploaded: boolean;
  isLoadingChat: boolean;
  chatError: string | null;
  chatHistory: Message[];
}

interface AppContextType {
  state: AppState;
  uploadPdf: (file: File) => Promise<boolean>;
  sendMessage: (message: string) => Promise<void>;
  resetChat: () => void;
  resetPdfState: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [pdfUploaded, setPdfUploaded] = useState(false);

  // We need to rename the hook's resetChat to avoid naming conflict
  const { chatHistory, isLoading, chatError, sendMessage, resetChat: resetChatState } = useChat();

  const uploadPdf = async (file: File): Promise<boolean> => {
    setIsUploading(true);
    setUploadError(null);

    try {
      const result = await uploadPdfService(file);
      setIsUploading(false);
      setPdfUploaded(result);
      return result;
    } catch (error) {
      console.error('Error in context:', error);
      setIsUploading(false);
      setUploadError(error instanceof Error ? error.message : 'Failed to upload PDF. Please try again.');
      return false;
    }
  };

  const resetChat = async () => {
    try {
      await clearChatHistory();
      resetChatState(); // This calls the local hook's resetChat function
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  };

  const resetPdfState = async () => {
    setPdfUploaded(false);
    setUploadError(null);
    try {
      await clearChatHistory();
      resetChatState(); // Clear local chat state too
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  };

  // Combine all state into a single object for easier consumption
  const state: AppState = {
    isUploading,
    uploadError,
    pdfUploaded,
    isLoadingChat: isLoading,
    chatError,
    chatHistory
  };

  return (
    <AppContext.Provider value={{ state, uploadPdf, sendMessage, resetChat, resetPdfState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
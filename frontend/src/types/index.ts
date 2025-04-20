export interface Message {
    id: string;
    question: string;
    answer: string;
    timestamp: string;
  }
  
  export interface AppState {
    pdfUploaded: boolean;
    isUploading: boolean;
    uploadError: string | null;
    chatHistory: Message[];
    isLoadingChat: boolean;
    chatError: string | null;
  }
  
  export interface AppContextType {
    state: AppState;
    uploadPdf: (file: File) => Promise<boolean>;
    sendMessage: (message: string) => Promise<void>;
    resetChat: () => void;
    resetPdfState: () => void;
  }
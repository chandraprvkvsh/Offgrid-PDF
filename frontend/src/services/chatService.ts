import api from './api';

// Update the MessageResponse type to match the backend format
export interface MessageResponse {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
}

export const sendMessage = async (content: string): Promise<MessageResponse> => {
  try {
    const response = await api.post('/chat/send', {
      content
    });

    // Return the response directly from the server - already has the right format
    return {
      id: response.data.id || Date.now().toString(),
      question: response.data.question || content,
      answer: response.data.answer || "I didn't understand that. Please try again.",
      timestamp: response.data.timestamp || new Date().toISOString()
    };
  } catch (error: any) {
    console.error('Error sending message:', error);
    if (error.response) {
      throw new Error(error.response.data.detail || `Server error: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No response received from server. Please check your connection.');
    } else {
      throw error;
    }
  }
};

export const getChatHistory = async () => {
  try {
    const response = await api.get('/chat/history');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching chat history:', error);
    if (error.response) {
      throw new Error(error.response.data.detail || `Server error: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No response received from server. Please check your connection.');
    } else {
      throw error;
    }
  }
};

export const streamChatResponse = (chatId: string): EventSource => {
  return new EventSource(`/api/chat/stream/${chatId}`);
};

export const clearChatHistory = async (): Promise<boolean> => {
  try {
    const response = await api.post('/chat/clear');
    return response.status === 200;
  } catch (error: any) {
    console.error('Error clearing chat history:', error);
    if (error.response) {
      throw new Error(error.response.data.detail || `Server error: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No response received from server. Please check your connection.');
    } else {
      throw error;
    }
  }
};
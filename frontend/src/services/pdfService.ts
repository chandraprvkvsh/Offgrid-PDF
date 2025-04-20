import api from './api';

export const uploadPdf = async (file: File): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/pdf/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      // Return true to indicate success
      return true;
    }

    throw new Error(`Server returned ${response.status}: ${response.data.detail || 'Unknown error'}`);
  } catch (error: any) {
    console.error('Error uploading PDF:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.detail || `Server error: ${error.response.status}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from server. Please check your connection.');
    } else {
      // Something happened in setting up the request
      throw error;
    }
  }
};
import { useState, useCallback } from 'react';
import { uploadPdf as apiUploadPdf } from '../services/pdfService';

export const usePdf = () => {
  const [pdfUploaded, setPdfUploaded] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadPdf = useCallback(async (file: File): Promise<boolean> => {
    try {
      setIsUploading(true);
      setUploadError(null);
      
      await apiUploadPdf(file);
      
      setPdfUploaded(true);
      return true;
    } catch (error) {
      setUploadError('Failed to upload PDF. Please try again.');
      console.error('Error uploading PDF:', error);
      return false;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const resetPdfState = useCallback(() => {
    setPdfUploaded(false);
    setUploadError(null);
  }, []);

  return {
    pdfUploaded,
    isUploading,
    uploadError,
    uploadPdf,
    resetPdfState
  };
};
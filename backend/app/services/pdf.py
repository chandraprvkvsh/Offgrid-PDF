from ..core.pdf import PDFProcessor
from ..core.vector_store import VectorDatabase
import logging
import os
import shutil
from ..config import settings

logger = logging.getLogger(__name__)

class PDFService:
    def __init__(self):
        self.pdf_processor = PDFProcessor()
        self.vector_db = VectorDatabase()

    async def process_pdf(self, content: bytes):
        if not content:
            logger.error("Empty PDF content received")
            raise ValueError("Empty PDF content")
            
        try:
            logger.info(f"Processing PDF content of size {len(content)} bytes")
            
            # Ensure we clean up the vector database first
            await self.vector_db.cleanup()
            
            # Also remove any chat history to keep things clean
            chat_history_dir = os.path.join(settings.DATA_DIR, "chat_history")
            if os.path.exists(chat_history_dir):
                logger.info(f"Cleaning up chat history at {chat_history_dir}")
                for file in os.listdir(chat_history_dir):
                    if file.endswith('.json'):
                        os.remove(os.path.join(chat_history_dir, file))
            
            documents = await self.pdf_processor.load_pdf(content)
            
            if not documents:
                logger.warning("No text content extracted from PDF")
                raise ValueError("Could not extract text from PDF. The file might be empty or password-protected.")
                
            logger.info(f"Extracted {len(documents)} document chunks from PDF")
            chunks = await self.pdf_processor.split_docs(documents)
            
            logger.info(f"Split into {len(chunks)} chunks, storing in vector database")
            await self.vector_db.create_db(chunks)
            
            logger.info("PDF processing completed successfully")
            return True
        except Exception as e:
            logger.error(f"Error processing PDF: {e}")
            raise
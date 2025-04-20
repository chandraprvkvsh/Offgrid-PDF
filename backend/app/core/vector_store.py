from langchain.vectorstores import FAISS
from langchain_community.embeddings import OllamaEmbeddings
from typing import List, Optional
from langchain.schema import Document
import os
import shutil
from ..config import settings
import logging

logger = logging.getLogger(__name__)

class VectorDatabase:
    def __init__(self):
        self.embeddings = OllamaEmbeddings(model=settings.EMBEDDING_MODEL)
        self.index_path = os.path.join(settings.DATA_DIR, settings.VECTOR_DB_PATH)
        self._db = None
    
    async def _load_db(self) -> Optional[FAISS]:
        """Load the vector database if it exists"""
        if os.path.exists(self.index_path):
            try:
                logger.info(f"Loading vector database from {self.index_path}")
                # Set allow_dangerous_deserialization to True since we're loading our own files
                return FAISS.load_local(self.index_path, self.embeddings, allow_dangerous_deserialization=True)
            except Exception as e:
                logger.error(f"Failed to load vector database: {e}")
        return None
    
    async def create_db(self, documents: List[Document]) -> None:
        """Create a new vector database from documents"""
        try:
            logger.info("Creating new vector database")
            os.makedirs(os.path.dirname(self.index_path), exist_ok=True)
            
            self._db = FAISS.from_documents(documents, self.embeddings)
            self._db.save_local(self.index_path)
            logger.info(f"Vector database saved to {self.index_path}")
        except Exception as e:
            logger.error(f"Error creating vector database: {e}")
            raise
    
    async def search(self, query: str, k: int = 5) -> List[Document]:
        """Search the vector database for relevant documents"""
        try:
            if self._db is None:
                self._db = await self._load_db()
                if self._db is None:
                    logger.warning("No vector database found, returning empty results")
                    return []
            
            logger.info(f"Searching for: {query}")
            return self._db.similarity_search(query, k=k)
        except Exception as e:
            logger.error(f"Error searching vector database: {e}")
            raise
    
    async def cleanup(self) -> None:
        """Clean up the vector database by removing all files"""
        try:
            faiss_dir = os.path.join(settings.DATA_DIR, "faiss_index")
            if os.path.exists(faiss_dir):
                logger.info(f"Cleaning up vector database at {faiss_dir}")
                
                # Complete removal of the directory and recreation
                shutil.rmtree(faiss_dir)
                os.makedirs(faiss_dir, exist_ok=True)
                
                # Reset the database object
                self._db = None
                logger.info("Vector database cleaned up successfully")
            else:
                logger.info("No vector database directory found to clean up")
                # Create the directory if it doesn't exist
                os.makedirs(faiss_dir, exist_ok=True)
        except Exception as e:
            logger.error(f"Error cleaning up vector database: {e}")
            raise
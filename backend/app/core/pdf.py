from typing import List
from pathlib import Path
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from PyPDF2 import PdfReader
import logging
from io import BytesIO

logger = logging.getLogger(__name__)

class PDFProcessor:
    def __init__(self, chunk_size: int = 7500, chunk_overlap: int = 100):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap
        )

    async def load_pdf(self, file: bytes) -> List[Document]:
        try:
            logger.info("Loading PDF content")
            documents = []
            # Create a file-like object from bytes
            pdf_file = BytesIO(file)
            reader = PdfReader(pdf_file)
            
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    documents.append(Document(page_content=text))
            return documents
        except Exception as e:
            logger.error(f"Error loading PDF: {e}")
            raise

    async def split_docs(self, documents: List[Document]) -> List[Document]:
        try:
            logger.info("Splitting documents into chunks")
            return self.splitter.split_documents(documents)
        except Exception as e:
            logger.error(f"Error splitting documents: {e}")
            raise
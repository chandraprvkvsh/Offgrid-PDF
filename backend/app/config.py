from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    MODEL_NAME: str = "llama3.2:latest"
    EMBEDDING_MODEL: str = "mxbai-embed-large"
    CHUNK_SIZE: int = 7500
    CHUNK_OVERLAP: int = 100
    VECTOR_DB_PATH: str = "faiss_index"
    DATA_DIR: str = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data")
    OLLAMA_BASE_URL: str = "http://localhost:11434"

settings = Settings()
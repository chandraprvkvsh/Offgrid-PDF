from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from .api.endpoints import pdf, chat
import os
from .core.vector_store import VectorDatabase

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

app = FastAPI(title="PDF Chat API")

# Add CORS middleware - Allow specific origin for more security
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Specifically allow the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create data directories if they don't exist
os.makedirs("./data/vector_db", exist_ok=True)

# Include routers
app.include_router(pdf.router, prefix="/api/pdf", tags=["pdf"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

# Add a root endpoint for basic testing
@app.get("/")
async def root():
    return {"message": "PDF Chat API is running"}

# Create vector database instance
vector_db = VectorDatabase()

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup resources on application shutdown"""
    logging.info("Application shutdown: cleaning up resources")
    try:
        await vector_db.cleanup()
        logging.info("Vector database cleaned up successfully")
    except Exception as e:
        logging.error(f"Error cleaning up vector database: {e}")
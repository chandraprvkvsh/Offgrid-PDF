import os
from ..config import settings
import logging

logger = logging.getLogger(__name__)

# This function is no longer needed but kept for API compatibility
# We could remove it entirely if we update all its references
async def get_db():
    yield None

async def init_db():
    """Initialize file directories for data storage"""
    # Create data directories
    os.makedirs(os.path.join(settings.DATA_DIR), exist_ok=True)
    os.makedirs(os.path.join(settings.DATA_DIR, "chat_history"), exist_ok=True)
    logger.info("File storage initialized")

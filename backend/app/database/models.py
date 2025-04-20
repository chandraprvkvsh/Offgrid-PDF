import json
import os
import uuid
from datetime import datetime
from typing import List, Dict, Any, Optional
import logging
import shutil
from ..config import settings

logger = logging.getLogger(__name__)

class FileStorage:
    @staticmethod
    async def save(collection: str, data: Dict[str, Any]) -> str:
        """Save data to a file and return the ID"""
        if "id" not in data:
            data["id"] = str(uuid.uuid4())
        
        if "timestamp" not in data:
            data["timestamp"] = datetime.utcnow().isoformat()
        
        collection_dir = os.path.join(settings.DATA_DIR, collection)
        os.makedirs(collection_dir, exist_ok=True)
        
        file_path = os.path.join(collection_dir, f"{data['id']}.json")
        with open(file_path, "w") as f:
            json.dump(data, f, indent=2)
        
        return data["id"]
    
    @staticmethod
    async def get(collection: str, item_id: str) -> Optional[Dict[str, Any]]:
        """Get an item by ID"""
        file_path = os.path.join(settings.DATA_DIR, collection, f"{item_id}.json")
        if not os.path.exists(file_path):
            return None
        
        with open(file_path, "r") as f:
            return json.load(f)
    
    @staticmethod
    async def list(collection: str, sort_by: str = None, reverse: bool = False) -> List[Dict[str, Any]]:
        """List all items in a collection"""
        collection_dir = os.path.join(settings.DATA_DIR, collection)
        if not os.path.exists(collection_dir):
            return []
        
        items = []
        for filename in os.listdir(collection_dir):
            if filename.endswith(".json"):
                file_path = os.path.join(collection_dir, filename)
                with open(file_path, "r") as f:
                    items.append(json.load(f))
        
        if sort_by and items:
            items.sort(key=lambda x: x.get(sort_by, ""), reverse=reverse)
        
        return items

class ChatHistory:
    """File-based chat history storage"""
    DATA_DIR = os.path.join(settings.DATA_DIR, "chat_history")
    
    @classmethod
    async def create(cls, question: str, answer: str) -> Dict[str, Any]:
        """Save a new chat message to file storage"""
        os.makedirs(cls.DATA_DIR, exist_ok=True)
        
        chat_id = str(uuid.uuid4())
        timestamp = datetime.now().isoformat()
        
        chat_data = {
            "id": chat_id,
            "question": question,
            "answer": answer,
            "timestamp": timestamp
        }
        
        file_path = os.path.join(cls.DATA_DIR, f"{chat_id}.json")
        with open(file_path, "w") as f:
            json.dump(chat_data, f)
            
        logger.info(f"Saved chat message with ID: {chat_id}")
        return chat_data
    
    @classmethod
    async def get_all(cls) -> List[Dict[str, Any]]:
        """Retrieve all chat messages"""
        if not os.path.exists(cls.DATA_DIR):
            return []
            
        result = []
        for filename in os.listdir(cls.DATA_DIR):
            if filename.endswith('.json'):
                file_path = os.path.join(cls.DATA_DIR, filename)
                try:
                    with open(file_path, "r") as f:
                        chat_data = json.load(f)
                        result.append(chat_data)
                except Exception as e:
                    logger.error(f"Error reading chat file {filename}: {e}")
                    
        # Sort by timestamp descending
        result.sort(key=lambda x: x.get("timestamp", ""), reverse=True)
        return result
    
    @classmethod
    async def clear_all(cls) -> None:
        """Delete all chat history"""
        if os.path.exists(cls.DATA_DIR):
            try:
                logger.info(f"Clearing all chat history from {cls.DATA_DIR}")
                for filename in os.listdir(cls.DATA_DIR):
                    if filename.endswith('.json'):
                        file_path = os.path.join(cls.DATA_DIR, filename)
                        os.remove(file_path)
                logger.info("Chat history cleared")
            except Exception as e:
                logger.error(f"Error clearing chat history: {e}")
                raise
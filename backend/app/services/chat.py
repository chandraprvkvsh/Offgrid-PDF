from ..core.llm import LLMHandler
from ..core.vector_store import VectorDatabase
from ..database.models import ChatHistory
from typing import List, AsyncGenerator, Dict, Any
import asyncio
import logging

logger = logging.getLogger(__name__)

class ChatService:
    def __init__(self):
        self.llm = LLMHandler()
        self.vector_db = VectorDatabase()
        self.current_generation = {}

    async def process_message(self, message: str):
        try:
            # Always get a fresh instance of the vector database
            self.vector_db = VectorDatabase()
            
            # Get relevant documents from vector database
            relevant_docs = await self.vector_db.search(message)
            
            if not relevant_docs:
                logger.warning("No relevant documents found in vector database")
                
            context = "\n\n".join([doc.page_content for doc in relevant_docs])
            
            # Get the response from LLM
            response = await self.llm.generate_response(message, context)
            
            # Save to chat history
            chat_history = await ChatHistory.create(
                question=message,
                answer=response
            )
            
            # Return the complete response for immediate display
            return {
                "id": chat_history["id"],
                "question": message,
                "answer": response,
                "timestamp": chat_history["timestamp"]
            }
        except Exception as e:
            logger.error(f"Error processing message: {e}")
            raise Exception(f"Error processing message: {e}")

    async def stream_response(self, chat_id: str) -> AsyncGenerator[str, None]:
        try:
            self.current_generation[chat_id] = True
            response = ""
            
            while self.current_generation[chat_id]:
                if not response:
                    yield "..."
                    await asyncio.sleep(0.1)
                else:
                    for token in response.split():
                        if not self.current_generation[chat_id]:
                            break
                        yield token
                        await asyncio.sleep(0.05)
                    break
                    
        except Exception as e:
            yield f"Error: {str(e)}"
        finally:
            self.current_generation.pop(chat_id, None)

    async def get_chat_history(self) -> List[Dict[str, Any]]:
        return await ChatHistory.get_all()

    async def clear_chat_history(self) -> None:
        """Clear all chat history"""
        try:
            await ChatHistory.clear_all()
        except Exception as e:
            raise Exception(f"Error clearing chat history: {e}")
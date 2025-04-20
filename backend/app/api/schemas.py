from pydantic import BaseModel
from typing import Optional

class MessageCreate(BaseModel):
    content: str

class Message(BaseModel):
    id: str
    question: str
    answer: str
    timestamp: str

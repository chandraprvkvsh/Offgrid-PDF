from fastapi import APIRouter, HTTPException, Request
from ...services.chat import ChatService
from ...api.schemas import MessageCreate
from sse_starlette.sse import EventSourceResponse

router = APIRouter()
chat_service = ChatService()

@router.post("/send")
async def send_message(message: MessageCreate):
    try:
        response = await chat_service.process_message(message.content)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/stream/{chat_id}")
async def stream_chat(chat_id: str, request: Request):
    async def event_generator():
        try:
            async for token in chat_service.stream_response(chat_id):
                if await request.is_disconnected():
                    break
                yield {
                    "event": "message",
                    "data": token
                }
        except Exception as e:
            yield {
                "event": "error",
                "data": str(e)
            }

    return EventSourceResponse(event_generator())

@router.get("/history")
async def get_chat_history():
    try:
        history = await chat_service.get_chat_history()
        return history
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/clear")
async def clear_chat_history():
    try:
        await chat_service.clear_chat_history()
        return {"message": "Chat history cleared successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
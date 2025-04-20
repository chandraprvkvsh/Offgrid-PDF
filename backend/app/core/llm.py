from langchain.prompts import ChatPromptTemplate
from langchain_community.llms import Ollama
import logging
from ..config import settings

logger = logging.getLogger(__name__)

class LLMHandler:
    def __init__(self):
        self.model = Ollama(model=settings.MODEL_NAME)

    def generate_query_prompt(self) -> str:
        return """You are an AI assistant. Generate 2 different versions of the given user question 
        to retrieve relevant documents from a vector database. Provide these alternative questions 
        separated by newlines.
        Original question: {question}"""

    def generate_rag_prompt(self) -> ChatPromptTemplate:
        template = """Answer the question based ONLY on the following context:
        {context}
        Question: {question}
        """
        return ChatPromptTemplate.from_template(template)

    async def generate_response(self, question: str, context: str) -> str:
        try:
            formatted_prompt = self.generate_rag_prompt().format(
                context=context or "No relevant context found.", 
                question=question
            )
            response = await self.model.agenerate([formatted_prompt])
            return response.generations[0][0].text
        except Exception as e:
            logger.error(f"Error generating response: {e}")
            raise

# OffgridPDF

OffgridPDF is a 100% locally hosted PDF chat application that allows you to have interactive conversations with your PDF documents. Upload your PDF and start asking questions about its content - all while keeping your data completely private on your local machine.

## Features

- **100% Local Processing**: All data stays on your machine - no cloud services involved
- **Privacy-Focused**: Your documents are never sent to external servers
- **Powered by Ollama**: Uses local Large Language Models for document analysis and responses
- **Intelligent PDF Analysis**: Processes and understands complex documents
- **Interactive Chat Interface**: Have natural conversations about your document content
- **Dark Mode UI**: Easy on the eyes for extended reading sessions
- **File-based Storage**: Simple data handling without complex databases
- **Fast Document Processing**: Efficient chunking and vectorization of documents
- **RAG Implementation**: Retrieval-Augmented Generation for accurate, context-aware responses

## System Requirements

- Python 3.8+ 
- Node.js 14+
- Ollama (for running local language models)
- 8GB+ RAM recommended
- 10GB+ free disk space (depending on the LLMs you use)
- GPU (optional) for faster model inference

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/offgrid-pdf.git
cd offgrid-pdf
```

### 2. Install Ollama

Ollama is required to run the language models locally. Follow the installation instructions for your platform:
- [Ollama Installation Guide](https://github.com/ollama/ollama)

### 3. Download Required Models

OffgridPDF requires two models - a language model for chat and an embedding model for document processing. You can use any models offered by Ollama by changing the configuration in the backend (app/config.py).

```bash
# Download the language model
ollama pull llama3.2

# Download the embedding model
ollama pull mxbai-embed-large

# Start the Ollama service
ollama serve
```

### 4. Choose Your Setup Method

You can run OffgridPDF in two ways:

#### Option A: Using Docker Compose (Recommended)

This is the simplest way to get started with minimal setup:

1. Make sure you have Docker and Docker Compose installed on your system
2. Run the application with:

```bash
docker-compose up
```

3. Access the application at http://localhost:3000

**Note**: You still need to install and run Ollama separately as shown in step 2 and 3.

#### Option B: Manual Setup

If you prefer to run the services without Docker, follow these steps:

##### Set Up Backend

Create and activate a virtual environment:

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment (Windows)
venv\Scripts\activate

# Activate the virtual environment (macOS/Linux)
source venv/bin/activate
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

##### Set Up Frontend

Navigate to the frontend directory and install the required packages:

```bash
cd frontend
npm install
```

If you encounter peer dependency issues, you can use:

```bash
npm install --legacy-peer-deps
```

## Running the Application

### Option A: Using Docker Compose

Start both the frontend and backend with a single command:

```bash
docker-compose up
```

This will build and start both services. To run in detached mode:

```bash
docker-compose up -d
```

To stop the services:

```bash
docker-compose down
```

### Option B: Manual Startup

#### 1. Start the Backend Server

Make sure your virtual environment is activated, then start the backend server:

```bash
# From the root project directory
uvicorn backend.app.main:app --reload --port 8000
```

#### 2. Start the Frontend Development Server

In a new terminal, navigate to the frontend directory and start the React development server:

```bash
cd frontend
npm start
```

This will start the frontend on http://localhost:3000

### 3. Access the Application

Open your web browser and navigate to:

```
http://localhost:3000
```

## Usage

1. **Upload a PDF**: On the home page, drag and drop a PDF or click to select one
2. **Wait for Processing**: The system will process and analyze your document
3. **Start Chatting**: Ask questions about your document in the chat interface
4. **View Responses**: Get AI-generated answers based on your document content
5. **Start New Chats**: Use the "New Chat" button to start fresh conversations
6. **Upload New Documents**: Choose "Upload New PDF" to work with different documents

## Troubleshooting

- **Ollama Connection Issues**: Ensure Ollama is running with `ollama serve`
- **Missing Models**: Verify models are downloaded with `ollama list`
- **Backend Errors**: Check terminal output for Python errors
- **Frontend Issues**: Inspect browser console for JavaScript errors
- **PDF Upload Failures**: Ensure PDFs aren't password protected or corrupted

## Architecture Overview

OffgridPDF uses a modern web architecture:

- **Backend**: FastAPI Python application handling PDF processing and AI interactions
- **Frontend**: React-based single-page application with TypeScript
- **Document Processing**: LangChain for PDF parsing and chunking
- **Vector Storage**: FAISS for efficient document embeddings and retrieval
- **LLM Integration**: Direct integration with Ollama for local AI inference

## License

[MIT License](LICENSE)

## Acknowledgements

- [Ollama](https://github.com/ollama/ollama) for local LLM capabilities
- [LangChain](https://github.com/langchain-ai/langchain) for document processing
- [FastAPI](https://fastapi.tiangolo.com/) for the backend framework
- [React](https://reactjs.org/) for the frontend framework

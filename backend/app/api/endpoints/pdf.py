from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from ...services.pdf import PDFService
from fastapi.logger import logger

router = APIRouter()

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...), pdf_service: PDFService = Depends()):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        logger.info(f"Processing PDF file: {file.filename}")
        content = await file.read()
        
        if not content:
            raise HTTPException(status_code=400, detail="Empty PDF file")
            
        await pdf_service.process_pdf(content)
        return {"message": "PDF processed successfully"}
    except Exception as e:
        logger.error(f"Error processing PDF: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")

import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided in the request.' },
        { status: 400 }
      );
    }

    const fileName = file.name || 'uploaded_resume';
    const lowerName = fileName.toLowerCase();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText = '';

    if (lowerName.endsWith('.pdf') || file.type === 'application/pdf') {
      try {
        const { extractText } = await import('unpdf');
        const uint8 = new Uint8Array(buffer);
        const { text } = await extractText(uint8);
        extractedText = Array.isArray(text) ? text.join('\n') : String(text || '');
      } catch (pdfErr: any) {
        console.error('PDF parsing error via unpdf:', pdfErr);
        return NextResponse.json(
          {
            success: false,
            error: 'Failed to extract text from PDF. It may be password-protected or an image-only scanned file.'
          },
          { status: 422 }
        );
      }
    } else if (lowerName.endsWith('.docx') || file.type.includes('wordprocessingml')) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const mammoth = require('mammoth');
        const result = await mammoth.extractRawText({ buffer });
        extractedText = result.value || '';
      } catch (docxErr: any) {
        console.error('DOCX parsing error via mammoth:', docxErr);
        return NextResponse.json(
          {
            success: false,
            error: 'Failed to extract text from Word (.docx) document.'
          },
          { status: 422 }
        );
      }
    } else {
      // Plain text, markdown, rtf, etc.
      extractedText = buffer.toString('utf-8');
    }

    if (!extractedText || !extractedText.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'The uploaded file contains no readable text. If it is an image scan, please paste your résumé text in the box below.'
        },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      fileName,
      text: extractedText,
      size: file.size,
    });
  } catch (err: any) {
    console.error('File extraction handler error:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'An error occurred while processing the file.'
      },
      { status: 500 }
    );
  }
}

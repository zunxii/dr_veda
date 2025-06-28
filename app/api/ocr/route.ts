import { NextRequest, NextResponse } from 'next/server';
import vision from '@google-cloud/vision';
import { Readable } from 'stream';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const client = new vision.ImageAnnotatorClient({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });

    const [result] = await client.documentTextDetection({ image: { content: buffer } });

    const fullText = result.fullTextAnnotation?.text || 'No text detected';

    return NextResponse.json({ text: fullText });
  } catch (error: any) {
    console.error('❌ OCR Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

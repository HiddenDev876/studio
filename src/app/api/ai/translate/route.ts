
import { NextRequest, NextResponse } from 'next/server';
import { translateText, TranslateTextInput } from '@/ai/flows/translate-text';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as TranslateTextInput;

    if (!body.text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }
    if (!body.targetLanguage) {
        return NextResponse.json({ error: 'Target language is required' }, { status: 400 });
    }

    const result = await translateText(body);
    return NextResponse.json(result, {
       headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin (adjust for production)
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error: any) {
    console.error('Error in translate API:', error);
    return NextResponse.json({ error: error.message || 'Failed to translate text' }, { status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
     });
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}


import { NextResponse } from 'next/server';
import { transcribeSpeech } from '@/ai/flows/speech-to-text-flow';

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.audioDataUri) {
      return NextResponse.json({ error: 'Audio data URI is required' }, { status: 400 });
    }

    const result = await transcribeSpeech(body);
    return NextResponse.json(result, {
       headers: {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('Error in speech-to-text API:', error);
    return NextResponse.json({ error: error.message || 'Failed to transcribe speech' }, { status: 500,
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


import { NextResponse } from 'next/server';
import { transcribeAudioFile } from '@/ai/flows/transcribe-audio-flow';

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.audioDataUri) {
      return NextResponse.json({ error: 'Audio data URI is required' }, { status: 400 });
    }
    if (!body.targetLanguage || !['English', 'Hindi'].includes(body.targetLanguage)) {
      return NextResponse.json({ error: 'Valid target language (English or Hindi) is required' }, { status: 400 });
    }

    const result = await transcribeAudioFile(body);
    return NextResponse.json(result, {
       headers: {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('Error in transcribe-audio API:', error);
    return NextResponse.json({ error: error.message || 'Failed to transcribe audio' }, { status: 500,
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

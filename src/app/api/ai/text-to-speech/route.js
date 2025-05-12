
import { NextResponse } from 'next/server';
import { convertTextToSpeech } from '@/ai/flows/text-to-speech-flow';

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.textToSpeak) {
      return NextResponse.json({ error: 'Text to speak is required' }, { status: 400 });
    }

    const result = await convertTextToSpeech(body);
    return NextResponse.json(result, {
       headers: {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('Error in text-to-speech API:', error);
    return NextResponse.json({ error: error.message || 'Failed to convert text to speech' }, { status: 500,
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

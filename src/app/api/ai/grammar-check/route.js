
import { NextResponse } from 'next/server';
import { checkGrammar } from '@/ai/flows/grammar-check-flow';

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const result = await checkGrammar(body);
    return NextResponse.json(result, {
       headers: {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('Error in grammar-check API:', error);
    return NextResponse.json({ error: error.message || 'Failed to check grammar' }, { status: 500,
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

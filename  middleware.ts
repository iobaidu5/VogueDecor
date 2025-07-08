// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Incoming request:', request.nextUrl.pathname);
  return NextResponse.next();
}
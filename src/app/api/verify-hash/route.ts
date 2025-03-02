// app/api/verify-hash/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET() {
  const isValid = bcrypt.compareSync(
    'PasswordSeguro123!', 
    '$2b$12$BeHYA7FW32eTXVyzub4a3eY9y1LPbRIpJMSkzYikar9qCIjlwKcpq'
  );
  
  return NextResponse.json({
    passwordMatch: isValid
  });
}
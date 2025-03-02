import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {

  const disabledHours = await prisma.disabledHour.findMany();  
  const formatted = disabledHours.reduce<{ [key: string]: string[] }>((acc, curr) => {
    acc[curr.date] = curr.hours;
    return acc;
  }, {});
  
  return NextResponse.json(formatted);
}

// El resto del código permanece igual
export async function POST(request: NextRequest) {
  const { date, hours } = await request.json();
  
  await prisma.disabledHour.upsert({ 
    where: { date },
    update: { hours },
    create: { date, hours }
  });

  return NextResponse.json({ success: true });
}
 
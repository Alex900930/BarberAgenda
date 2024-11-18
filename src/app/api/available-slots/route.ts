import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Importación nombrada

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateStr = searchParams.get('date');

    if (!dateStr) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    const date = new Date(dateStr);
    
    // Obtener las citas para la fecha seleccionada
    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          equals: date
        }
      },
      select: {
        time: true
      }
    });

    // Definir horarios disponibles (ajusta según tus necesidades)
    const allTimeSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ];

    // Crear array de slots con disponibilidad
    const availableSlots = allTimeSlots.map(time => ({
      time,
      available: !appointments.some(apt => apt.time === time)
    }));

    return NextResponse.json(availableSlots);
  } catch (error) {
    console.error('Error getting available slots:', error);
    return NextResponse.json(
      { error: 'Error getting available slots' },
      { status: 500 }
    );
  }
}
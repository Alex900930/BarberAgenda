import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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

    // Convertir la fecha a YYYY-MM-DD
    const date = new Date(dateStr);
    const formattedDate = date.toISOString().split('T')[0];

    // Obtener citas incluyendo el nuevo campo
    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: new Date(`${formattedDate}T00:00:00.000Z`),
          lt: new Date(`${formattedDate}T23:59:59.999Z`),
        },
      },
      select: {
        time: true,
        isOwnerReservation: true // Añadir este campo
      },
    });

    // Horarios disponibles (manteniendo tu array actual)
    const allTimeSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ];

    // Modificar la lógica de disponibilidad
    const availableSlots = allTimeSlots.map(time => ({
      time,
      available: !appointments.some(apt => 
        apt.time === time
      )
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
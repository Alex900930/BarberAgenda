import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { message: 'Date is required' },
        { status: 400 }
      );
    }

    const selectedDate = new Date(date);

    // Obtener todas las citas para la fecha seleccionada
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        date: {
          equals: selectedDate
        },
        status: {
          not: 'cancelled'
        }
      },
      select: {
        time: true
      }
    });

    // Crear array con todos los horarios posibles
    const allSlots = [
      "09:00", "10:00", "11:00", "12:00", "13:00",
      "14:00", "15:00", "16:00", "17:00"
    ];

    // Filtrar horarios ocupados
    const bookedTimes = existingAppointments.map(app => app.time);
    const availableSlots = allSlots.map(time => ({
      time,
      available: !bookedTimes.includes(time)
    }));

    return NextResponse.json(availableSlots);
  } catch (error) {
    console.error('Error getting available slots:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
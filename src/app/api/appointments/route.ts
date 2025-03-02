import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany();
    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error('Error al obtener citas:', error);
    return NextResponse.json(
      { message: 'Error al obtener las citas' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validación de campos requeridos
    const requiredFields = ['date', 'time', 'clientName', 'clientPhone'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          message: 'Todos los campos son requeridos',
          missingFields: missingFields 
        },
        { status: 400 }
      );
    }

    // Crear la cita con el nuevo campo
    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(body.date),
        time: body.time,
        clientName: body.clientName,
        clientEmail: body.clientEmail,
        clientPhone: body.clientPhone || '',
        isOwnerReservation: body.isOwnerReservation || false // Nuevo campo
      }
    });

    return NextResponse.json({ appointment }, { status: 201 });
    
  } catch (error) {
    console.error('Error en la creación de la cita:', error);
    return NextResponse.json(
      { message: 'Error al crear la cita' },
      { status: 500 }
    );
  }
}
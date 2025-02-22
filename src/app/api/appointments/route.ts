import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, time, clientName, clientEmail, clientPhone } = body;

    console.log('Received appointment request:', {
      date,
      time,
      clientName,
      clientEmail,
      clientPhone
    });

    // Validaciones
    if (!date || !time || !clientName || !clientEmail || !clientPhone) {
      console.error('Missing required fields:', { date, time, clientName, clientEmail, clientPhone });
      return NextResponse.json(
        { message: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Crear la cita
    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        time,
        clientName,
        clientEmail,
        clientPhone,
        // status: 'confirmed' // Esta línea ha sido eliminada
      },
    });

    console.log('Appointment created successfully:', appointment);

    return NextResponse.json({
      appointment,
    
    }, { status: 201 });
  } catch (error) {
    console.error('Error in appointment creation:', error);
    return NextResponse.json(
      { message: 'Error al crear la cita' },
      { status: 500 }
    );
  }
}
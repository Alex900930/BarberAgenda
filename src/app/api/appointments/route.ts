import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { sendWhatsAppMessage, formatClientMessage, formatOwnerMessage } from '@/services/whatsappService';

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
        status: 'confirmed'
      },
    });

    console.log('Appointment created successfully:', appointment);

    // Preparar los mensajes
    const messageData = {
      clientName,
      clientPhone,
      date: new Date(date),
      time
    };

    // Enviar mensaje al cliente
    const clientMessageSent = await sendWhatsAppMessage(
      clientPhone,
      formatClientMessage(messageData)
    );

    console.log('Client message status:', { sent: clientMessageSent });

    // Enviar mensaje al dueño
    const ownerPhone = process.env.OWNER_PHONE_NUMBER;
    let ownerMessageSent = false;
    
    if (ownerPhone) {
      ownerMessageSent = await sendWhatsAppMessage(
        ownerPhone,
        formatOwnerMessage(messageData)
      );
      console.log('Owner message status:', { sent: ownerMessageSent });
    } else {
      console.error('Owner phone number not configured');
    }

    return NextResponse.json({
      appointment,
      notifications: {
        clientMessageSent,
        ownerMessageSent
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error in appointment creation:', error);
    return NextResponse.json(
      { message: 'Error al crear la cita' },
      { status: 500 }
    );
  }
}
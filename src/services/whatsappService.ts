import twilio from 'twilio';

interface WhatsAppMessage {
  clientName: string;
  clientPhone: string;
  date: Date;
  time: string;
}

export async function sendWhatsAppMessage(to: string, message: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

  // Validación de variables de entorno
  if (!accountSid || !authToken || !fromNumber) {
    console.error('Missing Twilio credentials:', { accountSid, authToken, fromNumber });
    return false;
  }

  // Formatear números de teléfono
  const formattedTo = formatPhoneNumber(to);
  
  try {
    const twilioClient = twilio(accountSid, authToken);
    
    console.log('Sending WhatsApp message:', {
      to: formattedTo,
      from: `whatsapp:${fromNumber}`,
      messageLength: message.length
    });

    const result = await twilioClient.messages.create({
      body: message,
      from: `whatsapp:${fromNumber}`,
      to: `whatsapp:${formattedTo}`
    });

    console.log('WhatsApp message sent successfully:', {
      messageId: result.sid,
      status: result.status
    });

    return true;
  } catch (error) {
    console.error('Error sending WhatsApp message:', {
      error,
      to: formattedTo,
      messageLength: message.length
    });
    return false;
  }
}

// Función para formatear números de teléfono
function formatPhoneNumber(phone: string): string {
  // Eliminar todos los caracteres no numéricos
  let cleaned = phone.replace(/\D/g, '');
  
  // Asegurarse de que el número empiece con +
  if (!cleaned.startsWith('+')) {
    cleaned = '+' + cleaned;
  }
  
  // Asegurarse de que tenga el código de país
  if (!cleaned.startsWith('+55')) {
    cleaned = '+55' + cleaned;
  }

  return cleaned;
}

export function formatClientMessage({ clientName, date, time }: WhatsAppMessage) {
  const message = `¡Hola ${clientName}! Tu cita ha sido confirmada para el ${formatDate(date)} a las ${time}. Te esperamos en la barbería. Si necesitas cancelar o reprogramar, por favor contáctanos con anticipación.`;
  
  console.log('Formatted client message:', message);
  return message;
}

export function formatOwnerMessage({ clientName, clientPhone, date, time }: WhatsAppMessage) {
  const message = `Nueva cita programada:\nCliente: ${clientName}\nTeléfono: ${clientPhone}\nFecha: ${formatDate(date)}\nHora: ${time}`;
  
  console.log('Formatted owner message:', message);
  return message;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}
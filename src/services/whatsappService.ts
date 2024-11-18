interface WhatsAppMessage {
  clientName: string;
  clientPhone: string;
  date: Date;
  time: string;
}

// Función para enviar mensaje de WhatsApp
export function sendWhatsAppMessage(clientName: string, date: Date | string, time: string, clientPhone: string) {
  // Asegurarse de que date sea un objeto Date
  if (typeof date === 'string') {
    date = new Date(date);
  }

  // Formatear la fecha para el mensaje
  const formattedDate = date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
    
  // Crear el mensaje
  const message = `¡Hola! Soy ${clientName} y acabo de agendar una cita para el ${formattedDate} a las ${time}.`;
  
  // Crear el enlace de WhatsApp
  const whatsappUrl = `https://wa.me/${clientPhone}?text=${encodeURIComponent(message)}`;

  // Verificar si estamos en el cliente antes de intentar abrir una ventana
  if (typeof window !== 'undefined') {
    window.open(whatsappUrl, '_blank');
  } else {
    // Si estamos en el servidor, simplemente loguear el enlace
    console.log('WhatsApp message link:', whatsappUrl);
  }
}

// Función para formatear números de teléfono
function formatPhoneNumber(clientPhone: string): string {
  // Eliminar todos los caracteres no numéricos
  let cleaned = clientPhone.replace(/\D/g, '');
  
  // Asegurarse de que el número empiece con +
  if (!cleaned.startsWith('+')) {
    cleaned = '+' + cleaned;
  }
  
  // Asegurarse de que tenga el código de país
  if (!cleaned.startsWith('+55')) {
    cleaned = '+55' + cleaned;
  }

  // Eliminar el '+' para el enlace de WhatsApp
  return cleaned.replace('+', '');
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

function formatDate(date: Date | string) {
  // Asegurarse de que date sea un objeto Date
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}
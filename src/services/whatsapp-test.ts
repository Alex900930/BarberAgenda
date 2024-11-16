import {sendWhatsAppMessage  }  from '@/services/whatsappService';
import {formatClientMessage  }  from '@/services/whatsappService';
import {formatOwnerMessage  }  from '@/services/whatsappService';

import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

async function runTests() {
  console.log('Iniciando pruebas del servicio WhatsApp...');

  // Datos de prueba
  const testData = {
    clientName: "Cliente Prueba",
    clientPhone: process.env.OWNER_PHONE_NUMBER!, // Usamos el mismo número para pruebas
    date: new Date(),
    time: "14:30"
  };

  try {
    // Prueba 1: Mensaje simple
    console.log('\n1. Probando envío de mensaje simple...');
    const testResult1 = await sendWhatsAppMessage(
      process.env.OWNER_PHONE_NUMBER!,
      "Este es un mensaje de prueba del sistema de la barbería."
    );
    console.log('Resultado prueba 1:', testResult1);

    // Prueba 2: Mensaje formateado para cliente
    console.log('\n2. Probando mensaje formateado para cliente...');
    const clientMessage = formatClientMessage(testData);
    const testResult2 = await sendWhatsAppMessage(
      process.env.OWNER_PHONE_NUMBER!,
      clientMessage
    );
    console.log('Resultado prueba 2:', testResult2);

    // Prueba 3: Mensaje formateado para propietario
    console.log('\n3. Probando mensaje formateado para propietario...');
    const ownerMessage = formatOwnerMessage(testData);
    const testResult3 = await sendWhatsAppMessage(
      process.env.OWNER_PHONE_NUMBER!,
      ownerMessage
    );
    console.log('Resultado prueba 3:', testResult3);

  } catch (error) {
    console.error('Error durante las pruebas:', error);
  }
}

// Ejecutar las pruebas
runTests().then(() => {
  console.log('\nPruebas completadas.');
}).catch(error => {
  console.error('Error al ejecutar las pruebas:', error);
});
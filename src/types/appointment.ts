export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Appointment {
    id?: string;
    date: Date;
    time: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    status: 'pending' | 'confirmed' | 'cancelled';
  }

export  interface PaymentAppointmentDetails {
    id?: string;
    date:  Date | string | undefined;
    time: string | undefined;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
  }


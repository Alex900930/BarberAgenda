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
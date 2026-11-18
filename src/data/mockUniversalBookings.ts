export interface MockBookingItem {
  id: string;
  bookingNumber: string;
  storeId: string;
  storeName: string;
  businessCategory: 'CLINIC' | 'SALON' | 'AUTO_SERVICE' | 'PET_CARE' | 'FITNESS' | 'RETAIL' | 'GENERAL_SERVICE';
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  providerName: string;
  providerTitle: string;
  serviceName: string;
  serviceCategory: string;
  bookingDate: string; // YYYY-MM-DD
  bookingTime: string; // HH:mm
  durationMinutes: number;
  status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW' | 'RESCHEDULED';
  consultationNotes?: string;
  paymentStatus: 'PENDING' | 'PAID' | 'PARTIAL';
  paymentMode: 'UPI' | 'CASH' | 'CARD' | 'NETBANKING' | 'PENDING';
  amountTotal: number;
  amountPaid: number;
  whatsappConsent: boolean;
  reminderSent: boolean;
  reminderSentAt?: string;
  followUpRequired: boolean;
  followUpIntervalDays?: number;
  followUpDate?: string;
  followUpNotes?: string;
  followUpStatus: 'NONE' | 'PENDING' | 'CONTACTED' | 'CONVERTED' | 'EXPIRED';
}

const getToday = () => new Date().toISOString().split('T')[0];
const getFutureDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};
const getPastDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
};

export const mockUniversalBookings: MockBookingItem[] = [
  // --- 1. CLINIC VERTICAL ---
  {
    id: 'ub-cl-001',
    bookingNumber: 'BK-CLN-8921',
    storeId: 'store-apollo-01',
    storeName: 'Apollo 24/7 Super Clinic',
    businessCategory: 'CLINIC',
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98765 43210',
    customerEmail: 'aarav.sharma@gmail.com',
    providerName: 'Dr. Vivek Singhania',
    providerTitle: 'Chief Dental Surgeon',
    serviceName: 'Dental Scaling & Fluoride Coating',
    serviceCategory: 'Dental Care',
    bookingDate: getToday(),
    bookingTime: '10:30',
    durationMinutes: 45,
    status: 'COMPLETED',
    consultationNotes: 'Mild plaque removed. Patient advised warm salt water gargle and soft bristle brush. Stitch removal scheduled.',
    paymentStatus: 'PAID',
    paymentMode: 'UPI',
    amountTotal: 1800,
    amountPaid: 1800,
    whatsappConsent: true,
    reminderSent: true,
    reminderSentAt: `${getPastDate(1)} 18:00:00`,
    followUpRequired: true,
    followUpIntervalDays: 7,
    followUpDate: getFutureDate(7),
    followUpNotes: 'Follow-up for gum healing check and sensitivity evaluation.',
    followUpStatus: 'PENDING',
  },
  {
    id: 'ub-cl-002',
    bookingNumber: 'BK-CLN-8922',
    storeId: 'store-apollo-01',
    storeName: 'Apollo 24/7 Super Clinic',
    businessCategory: 'CLINIC',
    customerName: 'Sneha Kapur',
    customerPhone: '+91 99887 76655',
    customerEmail: 'sneha.kapur@gmail.com',
    providerName: 'Dr. Vivek Singhania',
    providerTitle: 'Chief Dental Surgeon',
    serviceName: 'Root Canal Treatment (RCT Step 1)',
    serviceCategory: 'Endodontics',
    bookingDate: getToday(),
    bookingTime: '11:30',
    durationMinutes: 60,
    status: 'CONFIRMED',
    consultationNotes: 'Pre-op X-Ray reviewed. Tooth #16 ready for access opening.',
    paymentStatus: 'PENDING',
    paymentMode: 'PENDING',
    amountTotal: 4500,
    amountPaid: 0,
    whatsappConsent: true,
    reminderSent: true,
    reminderSentAt: `${getPastDate(1)} 18:00:00`,
    followUpRequired: true,
    followUpIntervalDays: 5,
    followUpDate: getFutureDate(5),
    followUpNotes: 'RCT Step 2: Obturation & Crown measurement',
    followUpStatus: 'PENDING',
  },
  {
    id: 'ub-cl-003',
    bookingNumber: 'BK-CLN-8923',
    storeId: 'store-apollo-01',
    storeName: 'Apollo 24/7 Super Clinic',
    businessCategory: 'CLINIC',
    customerName: 'Rajesh Patil',
    customerPhone: '+91 91234 56789',
    customerEmail: 'rajesh.patil@outlook.com',
    providerName: 'Dr. Vivek Singhania',
    providerTitle: 'Chief Dental Surgeon',
    serviceName: 'Orthodontic Aligners Checkup',
    serviceCategory: 'Orthodontics',
    bookingDate: getFutureDate(1),
    bookingTime: '15:00',
    durationMinutes: 30,
    status: 'CONFIRMED',
    consultationNotes: 'Tray 8 fitting and space audit.',
    paymentStatus: 'PENDING',
    paymentMode: 'PENDING',
    amountTotal: 1200,
    amountPaid: 0,
    whatsappConsent: true,
    reminderSent: false, // Pending 18:00 auto-trigger
    followUpRequired: true,
    followUpIntervalDays: 30,
    followUpDate: getFutureDate(31),
    followUpNotes: 'Monthly aligner tracking & tray 9 delivery',
    followUpStatus: 'NONE',
  },

  // --- 2. SALON & SPA VERTICAL ---
  {
    id: 'ub-sl-001',
    bookingNumber: 'BK-SAL-4102',
    storeId: 'store-enrich-02',
    storeName: 'Enrich Luxury Salon & Spa',
    businessCategory: 'SALON',
    customerName: 'Pooja Hegde',
    customerPhone: '+91 97654 32109',
    customerEmail: 'pooja.h@yahoo.com',
    providerName: 'Vikram Sethi',
    providerTitle: 'Master Stylist & Colorist',
    serviceName: 'Balayage Hair Color & Olaplex Spa',
    serviceCategory: 'Hair Artistry',
    bookingDate: getToday(),
    bookingTime: '14:00',
    durationMinutes: 120,
    status: 'CONFIRMED',
    consultationNotes: 'Ashed honey balayage with gloss toner finish.',
    paymentStatus: 'PAID',
    paymentMode: 'CARD',
    amountTotal: 6500,
    amountPaid: 6500,
    whatsappConsent: true,
    reminderSent: true,
    reminderSentAt: `${getPastDate(1)} 18:00:00`,
    followUpRequired: true,
    followUpIntervalDays: 30,
    followUpDate: getFutureDate(30),
    followUpNotes: 'Color toner touch-up and sulfate-free hydration therapy.',
    followUpStatus: 'PENDING',
  },
  {
    id: 'ub-sl-002',
    bookingNumber: 'BK-SAL-4103',
    storeId: 'store-enrich-02',
    storeName: 'Enrich Luxury Salon & Spa',
    businessCategory: 'SALON',
    customerName: 'Ananya Verma',
    customerPhone: '+91 98112 23344',
    providerName: 'Neha Deshmukh',
    providerTitle: 'Senior Esthetician',
    serviceName: 'Hydra-Facial & Glow Therapy',
    serviceCategory: 'Skin Care',
    bookingDate: getPastDate(15),
    bookingTime: '16:00',
    durationMinutes: 60,
    status: 'COMPLETED',
    consultationNotes: 'Deep pores extractions done. Recommended SPF 50 sunscreen.',
    paymentStatus: 'PAID',
    paymentMode: 'UPI',
    amountTotal: 3200,
    amountPaid: 3200,
    whatsappConsent: true,
    reminderSent: true,
    followUpRequired: true,
    followUpIntervalDays: 15,
    followUpDate: getToday(), // Due TODAY!
    followUpNotes: '15-Day Skin Rehydration follow-up recall.',
    followUpStatus: 'PENDING',
  },

  // --- 3. AUTO SERVICE & GARAGE VERTICAL ---
  {
    id: 'ub-at-001',
    bookingNumber: 'BK-AUT-7201',
    storeId: 'store-speed-03',
    storeName: 'SpeedWheels Bosch Auto Care',
    businessCategory: 'AUTO_SERVICE',
    customerName: 'Kunal Singhal',
    customerPhone: '+91 98450 12345',
    customerEmail: 'kunal.s@gmail.com',
    providerName: 'Amitabh Sharma',
    providerTitle: 'Head Diagnostic Mechanic',
    serviceName: 'Full Periodic Service & Synthetic Oil Change',
    serviceCategory: 'Car Maintenance',
    bookingDate: getToday(),
    bookingTime: '09:30',
    durationMinutes: 90,
    status: 'COMPLETED',
    consultationNotes: 'Engine flushed, 5W-30 Shell Helix filled. Front brake pads at 40% wear.',
    paymentStatus: 'PAID',
    paymentMode: 'UPI',
    amountTotal: 5400,
    amountPaid: 5400,
    whatsappConsent: true,
    reminderSent: true,
    followUpRequired: true,
    followUpIntervalDays: 90,
    followUpDate: getFutureDate(90),
    followUpNotes: '90-Day Brake Pad inspection and Wheel Alignment check.',
    followUpStatus: 'PENDING',
  },

  // --- 4. PET CARE & VET VERTICAL ---
  {
    id: 'ub-pt-001',
    bookingNumber: 'BK-PET-3301',
    storeId: 'store-petcare-04',
    storeName: 'Paws & Claws Veterinary Hospital',
    businessCategory: 'PET_CARE',
    customerName: 'Meera Chawla',
    customerPhone: '+91 97110 99887',
    providerName: 'Dr. Radhika Nair',
    providerTitle: 'Senior Veterinary Surgeon',
    serviceName: 'Annual DHPPiL + Anti-Rabies Booster',
    serviceCategory: 'Pet Vaccination',
    bookingDate: getPastDate(7),
    bookingTime: '11:00',
    durationMinutes: 30,
    status: 'COMPLETED',
    consultationNotes: 'Puppy (Golden Retriever, 10 months) vaccinated. Weight: 26.4kg. Deworming pill administered.',
    paymentStatus: 'PAID',
    paymentMode: 'CASH',
    amountTotal: 1500,
    amountPaid: 1500,
    whatsappConsent: true,
    reminderSent: true,
    followUpRequired: true,
    followUpIntervalDays: 7,
    followUpDate: getToday(), // Due TODAY!
    followUpNotes: 'Post-vaccine fever/appetite follow-up check.',
    followUpStatus: 'PENDING',
  },

  // --- 5. FITNESS & YOGA VERTICAL ---
  {
    id: 'ub-ft-001',
    bookingNumber: 'BK-FIT-9011',
    storeId: 'store-fitpulse-05',
    storeName: 'FitPulse Strength & Yoga Studio',
    businessCategory: 'FITNESS',
    customerName: 'Devansh Joshi',
    customerPhone: '+91 96543 21987',
    providerName: 'Coach Ritu Arya',
    providerTitle: 'Certified Rehab & Pilates Coach',
    serviceName: '1-on-1 Posture Rehab & Core Training',
    serviceCategory: 'Personal Training',
    bookingDate: getFutureDate(1),
    bookingTime: '07:30',
    durationMinutes: 60,
    status: 'CONFIRMED',
    consultationNotes: 'Lower lumbar decompression session.',
    paymentStatus: 'PAID',
    paymentMode: 'UPI',
    amountTotal: 2000,
    amountPaid: 2000,
    whatsappConsent: true,
    reminderSent: false,
    followUpRequired: true,
    followUpIntervalDays: 14,
    followUpDate: getFutureDate(15),
    followUpNotes: 'Bi-weekly spine flexibility assessment.',
    followUpStatus: 'NONE',
  },
];

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export interface UniversalBookingAttributes {
  id: string;
  bookingNumber: string;
  storeId: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  businessCategory: 'CLINIC' | 'SALON' | 'AUTO_SERVICE' | 'PET_CARE' | 'FITNESS' | 'RETAIL' | 'GENERAL_SERVICE';
  providerName: string;
  providerTitle?: string;
  serviceName: string;
  serviceCategory?: string;
  bookingDate: string; // YYYY-MM-DD
  bookingTime: string; // HH:mm (e.g. 10:30)
  durationMinutes: number;
  status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW' | 'RESCHEDULED';
  consultationNotes?: string;
  prescriptionOrInvoiceUrl?: string;
  paymentStatus: 'PENDING' | 'PAID' | 'PARTIAL';
  paymentMode: 'UPI' | 'CASH' | 'CARD' | 'NETBANKING' | 'PENDING';
  amountTotal: number;
  amountPaid: number;
  whatsappConsent: boolean;
  reminderSent: boolean;
  reminderSentAt?: Date;
  followUpRequired: boolean;
  followUpIntervalDays?: number; // 7, 15, 30, 90
  followUpDate?: string; // YYYY-MM-DD
  followUpNotes?: string;
  followUpStatus: 'NONE' | 'PENDING' | 'CONTACTED' | 'CONVERTED' | 'EXPIRED';
  createdAt?: Date;
  updatedAt?: Date;
}

export class UniversalBooking extends Model<UniversalBookingAttributes> implements UniversalBookingAttributes {
  public id!: string;
  public bookingNumber!: string;
  public storeId!: string;
  public customerId?: string;
  public customerName!: string;
  public customerPhone!: string;
  public customerEmail?: string;
  public businessCategory!: 'CLINIC' | 'SALON' | 'AUTO_SERVICE' | 'PET_CARE' | 'FITNESS' | 'RETAIL' | 'GENERAL_SERVICE';
  public providerName!: string;
  public providerTitle?: string;
  public serviceName!: string;
  public serviceCategory?: string;
  public bookingDate!: string;
  public bookingTime!: string;
  public durationMinutes!: number;
  public status!: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW' | 'RESCHEDULED';
  public consultationNotes?: string;
  public prescriptionOrInvoiceUrl?: string;
  public paymentStatus!: 'PENDING' | 'PAID' | 'PARTIAL';
  public paymentMode!: 'UPI' | 'CASH' | 'CARD' | 'NETBANKING' | 'PENDING';
  public amountTotal!: number;
  public amountPaid!: number;
  public whatsappConsent!: boolean;
  public reminderSent!: boolean;
  public reminderSentAt?: Date;
  public followUpRequired!: boolean;
  public followUpIntervalDays?: number;
  public followUpDate?: string;
  public followUpNotes?: string;
  public followUpStatus!: 'NONE' | 'PENDING' | 'CONTACTED' | 'CONVERTED' | 'EXPIRED';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UniversalBooking.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bookingNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    storeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    customerName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    customerPhone: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    customerEmail: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    businessCategory: {
      type: DataTypes.STRING(50),
      defaultValue: 'GENERAL_SERVICE',
    },
    providerName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    providerTitle: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: 'Specialist',
    },
    serviceName: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    serviceCategory: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    bookingDate: {
      type: DataTypes.STRING(20), // YYYY-MM-DD
      allowNull: false,
    },
    bookingTime: {
      type: DataTypes.STRING(20), // HH:mm
      allowNull: false,
    },
    durationMinutes: {
      type: DataTypes.INTEGER,
      defaultValue: 30,
    },
    status: {
      type: DataTypes.ENUM('CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW', 'RESCHEDULED'),
      defaultValue: 'CONFIRMED',
    },
    consultationNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    prescriptionOrInvoiceUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    paymentStatus: {
      type: DataTypes.ENUM('PENDING', 'PAID', 'PARTIAL'),
      defaultValue: 'PENDING',
    },
    paymentMode: {
      type: DataTypes.STRING(30),
      defaultValue: 'PENDING',
    },
    amountTotal: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    amountPaid: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    whatsappConsent: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    reminderSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    reminderSentAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    followUpRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    followUpIntervalDays: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    followUpDate: {
      type: DataTypes.STRING(20), // YYYY-MM-DD
      allowNull: true,
    },
    followUpNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    followUpStatus: {
      type: DataTypes.ENUM('NONE', 'PENDING', 'CONTACTED', 'CONVERTED', 'EXPIRED'),
      defaultValue: 'NONE',
    },
  },
  {
    sequelize,
    tableName: 'universal_bookings',
    indexes: [
      { unique: true, fields: ['bookingNumber'] },
      { fields: ['storeId', 'bookingDate', 'status'] },
      { fields: ['storeId', 'providerName', 'bookingDate', 'bookingTime'] },
      { fields: ['followUpDate', 'followUpStatus'] },
    ],
  }
);

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export interface OrderAttributes {
  id: string;
  orderNumber: string;
  customerId: string;
  storeId: string;
  riderId?: string;
  orderStatus: 'RECEIVED' | 'PREPARING' | 'READY_FOR_PICKUP' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'REJECTED';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  paymentMethod: 'UPI_QR' | 'RAZORPAY' | 'PHONEPE' | 'CASH_ON_DELIVERY' | 'WALLET';
  subtotal: number;
  gstTaxAmount: number;
  deliveryFee: number;
  discountAmount: number;
  tipAmount: number;
  totalAmount: number;
  deliveryAddressJson: string;
  deliverySlot?: string;
  acceptanceCountdownSeconds?: number;
  acceptanceExpiresAt?: Date;
  deliveryOtp?: string;
  notes?: string;
  cancellationReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: string;
  public orderNumber!: string;
  public customerId!: string;
  public storeId!: string;
  public riderId?: string;
  public orderStatus!: 'RECEIVED' | 'PREPARING' | 'READY_FOR_PICKUP' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'REJECTED';
  public paymentStatus!: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  public paymentMethod!: 'UPI_QR' | 'RAZORPAY' | 'PHONEPE' | 'CASH_ON_DELIVERY' | 'WALLET';
  public subtotal!: number;
  public gstTaxAmount!: number;
  public deliveryFee!: number;
  public discountAmount!: number;
  public tipAmount!: number;
  public totalAmount!: number;
  public deliveryAddressJson!: string;
  public deliverySlot?: string;
  public acceptanceCountdownSeconds?: number;
  public acceptanceExpiresAt?: Date;
  public deliveryOtp?: string;
  public notes?: string;
  public cancellationReason?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    storeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    riderId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    orderStatus: {
      type: DataTypes.ENUM('RECEIVED', 'PREPARING', 'READY_FOR_PICKUP', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'REJECTED'),
      defaultValue: 'RECEIVED',
    },
    paymentStatus: {
      type: DataTypes.ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED'),
      defaultValue: 'PENDING',
    },
    paymentMethod: {
      type: DataTypes.ENUM('UPI_QR', 'RAZORPAY', 'PHONEPE', 'CASH_ON_DELIVERY', 'WALLET'),
      defaultValue: 'UPI_QR',
    },
    subtotal: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    gstTaxAmount: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0.00,
    },
    deliveryFee: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0.00,
    },
    discountAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
    tipAmount: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0.00,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    deliveryAddressJson: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    deliverySlot: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    acceptanceCountdownSeconds: {
      type: DataTypes.INTEGER,
      defaultValue: 300,
    },
    acceptanceExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deliveryOtp: {
      type: DataTypes.STRING(10),
      defaultValue: '4921',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cancellationReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'orders',
    indexes: [
      { unique: true, fields: ['order_number'] },
      { fields: ['customer_id'] },
      { fields: ['store_id'] },
      { fields: ['rider_id'] },
      { fields: ['order_status'] },
    ],
  }
);

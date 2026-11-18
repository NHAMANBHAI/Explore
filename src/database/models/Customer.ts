import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export interface CustomerAttributes {
  id: string;
  userId?: string;
  name: string;
  email: string;
  mobile: string;
  countryCode: string;
  avatarUrl?: string;
  status: 'ACTIVE' | 'BLOCKED' | 'SUSPENDED';
  kycStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
  referralCode: string;
  referredByCode?: string;
  walletBalance: number;
  loyaltyPoints: number;
  totalOrdersCount: number;
  totalSpentAmount: number;
  lastOrderAt?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Customer extends Model<CustomerAttributes> implements CustomerAttributes {
  public id!: string;
  public userId?: string;
  public name!: string;
  public email!: string;
  public mobile!: string;
  public countryCode!: string;
  public avatarUrl?: string;
  public status!: 'ACTIVE' | 'BLOCKED' | 'SUSPENDED';
  public kycStatus!: 'VERIFIED' | 'PENDING' | 'REJECTED';
  public referralCode!: string;
  public referredByCode?: string;
  public walletBalance!: number;
  public loyaltyPoints!: number;
  public totalOrdersCount!: number;
  public totalSpentAmount!: number;
  public lastOrderAt?: Date;
  public notes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Customer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    mobile: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    countryCode: {
      type: DataTypes.STRING(10),
      defaultValue: '+91',
    },
    avatarUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'BLOCKED', 'SUSPENDED'),
      defaultValue: 'ACTIVE',
    },
    kycStatus: {
      type: DataTypes.ENUM('VERIFIED', 'PENDING', 'REJECTED'),
      defaultValue: 'VERIFIED',
    },
    referralCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    referredByCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    walletBalance: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0.00,
    },
    loyaltyPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalOrdersCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalSpentAmount: {
      type: DataTypes.DECIMAL(14, 2),
      defaultValue: 0.00,
    },
    lastOrderAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'customers',
    indexes: [
      { unique: true, fields: ['email'] },
      { unique: true, fields: ['mobile'] },
      { unique: true, fields: ['referral_code'] },
    ],
  }
);

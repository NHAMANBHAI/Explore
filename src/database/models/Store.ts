import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export interface StoreAttributes {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  email: string;
  phone: string;
  businessType: string;
  gstin?: string;
  panNumber?: string;
  fssaiNumber?: string;
  commissionRate: number;
  status: 'PENDING' | 'APPROVED' | 'SUSPENDED';
  bankAccountName?: string;
  bankAccountNumber?: string;
  bankIfsc?: string;
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
  avgRating: number;
  totalReviews: number;
  city: string;
  state: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Store extends Model<StoreAttributes> implements StoreAttributes {
  public id!: string;
  public name!: string;
  public slug!: string;
  public description?: string;
  public logoUrl?: string;
  public bannerUrl?: string;
  public email!: string;
  public phone!: string;
  public businessType!: string;
  public gstin?: string;
  public panNumber?: string;
  public fssaiNumber?: string;
  public commissionRate!: number;
  public status!: 'PENDING' | 'APPROVED' | 'SUSPENDED';
  public bankAccountName?: string;
  public bankAccountNumber?: string;
  public bankIfsc?: string;
  public openingTime!: string;
  public closingTime!: string;
  public isOpen!: boolean;
  public avgRating!: number;
  public totalReviews!: number;
  public city!: string;
  public state!: string;
  public postalCode!: string;
  public latitude?: number;
  public longitude?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Store.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    logoUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    bannerUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    businessType: {
      type: DataTypes.STRING(50),
      defaultValue: 'RETAIL',
    },
    gstin: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    panNumber: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    fssaiNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    commissionRate: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0.00,
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'APPROVED', 'SUSPENDED'),
      defaultValue: 'APPROVED',
    },
    bankAccountName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    bankAccountNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    bankIfsc: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    openingTime: {
      type: DataTypes.STRING(20),
      defaultValue: '09:00',
    },
    closingTime: {
      type: DataTypes.STRING(20),
      defaultValue: '22:00',
    },
    isOpen: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    avgRating: {
      type: DataTypes.DOUBLE,
      defaultValue: 4.9,
    },
    totalReviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'stores',
    indexes: [{ unique: true, fields: ['slug'] }],
  }
);

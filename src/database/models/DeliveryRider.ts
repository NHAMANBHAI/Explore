import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export interface DeliveryRiderAttributes {
  id: string;
  userId?: string;
  fullName: string;
  mobile: string;
  vehicleType: 'BIKE' | 'EV_SCOOTER' | 'CYCLE';
  vehiclePlateNumber?: string;
  licenseNumber?: string;
  currentLat?: number;
  currentLng?: number;
  status: 'ONLINE' | 'OFFLINE' | 'BUSY';
  rating: number;
  totalTrips: number;
  totalCashCollected: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class DeliveryRider extends Model<DeliveryRiderAttributes> implements DeliveryRiderAttributes {
  public id!: string;
  public userId?: string;
  public fullName!: string;
  public mobile!: string;
  public vehicleType!: 'BIKE' | 'EV_SCOOTER' | 'CYCLE';
  public vehiclePlateNumber?: string;
  public licenseNumber?: string;
  public currentLat?: number;
  public currentLng?: number;
  public status!: 'ONLINE' | 'OFFLINE' | 'BUSY';
  public rating!: number;
  public totalTrips!: number;
  public totalCashCollected!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DeliveryRider.init(
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
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    vehicleType: {
      type: DataTypes.ENUM('BIKE', 'EV_SCOOTER', 'CYCLE'),
      defaultValue: 'BIKE',
    },
    vehiclePlateNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    licenseNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    currentLat: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    currentLng: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('ONLINE', 'OFFLINE', 'BUSY'),
      defaultValue: 'ONLINE',
    },
    rating: {
      type: DataTypes.DOUBLE,
      defaultValue: 4.9,
    },
    totalTrips: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalCashCollected: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0.00,
    },
  },
  {
    sequelize,
    tableName: 'delivery_riders',
    indexes: [{ unique: true, fields: ['mobile'] }],
  }
);

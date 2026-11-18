import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export interface DeliveryZoneAttributes {
  id: string;
  name: string;
  code: string;
  coordinatesGeoJson: string;
  baseDeliveryFee: number;
  perKmFee: number;
  minOrderValue: number;
  maxRadiusKm: number;
  avgDeliveryMinutes: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class DeliveryZone extends Model<DeliveryZoneAttributes> implements DeliveryZoneAttributes {
  public id!: string;
  public name!: string;
  public code!: string;
  public coordinatesGeoJson!: string;
  public baseDeliveryFee!: number;
  public perKmFee!: number;
  public minOrderValue!: number;
  public maxRadiusKm!: number;
  public avgDeliveryMinutes!: number;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DeliveryZone.init(
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
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    coordinatesGeoJson: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    baseDeliveryFee: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 30.00,
    },
    perKmFee: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 8.00,
    },
    minOrderValue: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 199.00,
    },
    maxRadiusKm: {
      type: DataTypes.DOUBLE,
      defaultValue: 12.0,
    },
    avgDeliveryMinutes: {
      type: DataTypes.INTEGER,
      defaultValue: 25,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'delivery_zones',
    indexes: [{ unique: true, fields: ['code'] }],
  }
);

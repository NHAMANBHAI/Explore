import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export interface AddressAttributes {
  id: string;
  customerId: string;
  type: 'HOME' | 'WORK' | 'OTHER';
  street: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  isDefault: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Address extends Model<AddressAttributes> implements AddressAttributes {
  public id!: string;
  public customerId!: string;
  public type!: 'HOME' | 'WORK' | 'OTHER';
  public street!: string;
  public landmark?: string;
  public city!: string;
  public state!: string;
  public postalCode!: string;
  public country!: string;
  public latitude?: number;
  public longitude?: number;
  public isDefault!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Address.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('HOME', 'WORK', 'OTHER'),
      defaultValue: 'HOME',
    },
    street: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    landmark: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
    country: {
      type: DataTypes.STRING(100),
      defaultValue: 'India',
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'addresses',
    indexes: [{ fields: ['customer_id'] }],
  }
);

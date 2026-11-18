import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export interface SystemSettingAttributes {
  id: string;
  key: string;
  value: string;
  group: string;
  isPublic: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class SystemSetting extends Model<SystemSettingAttributes> implements SystemSettingAttributes {
  public id!: string;
  public key!: string;
  public value!: string;
  public group!: string;
  public isPublic!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SystemSetting.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    group: {
      type: DataTypes.STRING(50),
      defaultValue: 'GENERAL',
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'system_settings',
    indexes: [{ unique: true, fields: ['key'] }],
  }
);

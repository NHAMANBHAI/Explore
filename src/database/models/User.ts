import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  role: 'SUPER_ADMIN' | 'STORE_MANAGER' | 'DISPATCHER' | 'FINANCE_ADMIN' | 'RIDER';
  avatarUrl?: string;
  phone?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  status: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public email!: string;
  public passwordHash?: string;
  public role!: 'SUPER_ADMIN' | 'STORE_MANAGER' | 'DISPATCHER' | 'FINANCE_ADMIN' | 'RIDER';
  public avatarUrl?: string;
  public phone?: string;
  public emailVerified!: boolean;
  public phoneVerified!: boolean;
  public twoFactorEnabled!: boolean;
  public status!: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('SUPER_ADMIN', 'STORE_MANAGER', 'DISPATCHER', 'FINANCE_ADMIN', 'RIDER'),
      defaultValue: 'SUPER_ADMIN',
    },
    avatarUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phoneVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    twoFactorEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'SUSPENDED', 'INACTIVE'),
      defaultValue: 'ACTIVE',
    },
  },
  {
    sequelize,
    tableName: 'users',
    indexes: [{ unique: true, fields: ['email'] }],
  }
);

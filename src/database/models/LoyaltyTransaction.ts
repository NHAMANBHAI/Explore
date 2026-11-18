import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export interface LoyaltyTransactionAttributes {
  id: string;
  customerId: string;
  points: number;
  type: 'CREDIT' | 'DEBIT';
  balanceAfter: number;
  reason: 'PURCHASE_REWARD' | 'ADMIN_ADJUSTMENT' | 'REDEMPTION' | 'PROMOTIONAL_BONUS';
  performedBy?: string;
  createdAt?: Date;
}

export class LoyaltyTransaction extends Model<LoyaltyTransactionAttributes> implements LoyaltyTransactionAttributes {
  public id!: string;
  public customerId!: string;
  public points!: number;
  public type!: 'CREDIT' | 'DEBIT';
  public balanceAfter!: number;
  public reason!: 'PURCHASE_REWARD' | 'ADMIN_ADJUSTMENT' | 'REDEMPTION' | 'PROMOTIONAL_BONUS';
  public performedBy?: string;
  public readonly createdAt!: Date;
}

LoyaltyTransaction.init(
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
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('CREDIT', 'DEBIT'),
      allowNull: false,
    },
    balanceAfter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING(255),
      defaultValue: 'ADMIN_ADJUSTMENT',
    },
    performedBy: {
      type: DataTypes.STRING(100),
      defaultValue: 'ADMIN',
    },
  },
  {
    sequelize,
    tableName: 'loyalty_transactions',
    updatedAt: false,
    indexes: [{ fields: ['customer_id'] }],
  }
);

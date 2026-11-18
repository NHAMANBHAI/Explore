import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export interface WalletTransactionAttributes {
  id: string;
  customerId: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  balanceAfter: number;
  referenceType: 'ORDER_REFUND' | 'ADMIN_ADJUSTMENT' | 'CASHBACK' | 'DEPOSIT' | 'ORDER_PAYMENT';
  referenceId?: string;
  remarks: string;
  performedBy?: string;
  createdAt?: Date;
}

export class WalletTransaction extends Model<WalletTransactionAttributes> implements WalletTransactionAttributes {
  public id!: string;
  public customerId!: string;
  public amount!: number;
  public type!: 'CREDIT' | 'DEBIT';
  public balanceAfter!: number;
  public referenceType!: 'ORDER_REFUND' | 'ADMIN_ADJUSTMENT' | 'CASHBACK' | 'DEPOSIT' | 'ORDER_PAYMENT';
  public referenceId?: string;
  public remarks!: string;
  public performedBy?: string;
  public readonly createdAt!: Date;
}

WalletTransaction.init(
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
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('CREDIT', 'DEBIT'),
      allowNull: false,
    },
    balanceAfter: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    referenceType: {
      type: DataTypes.STRING(50),
      defaultValue: 'ADMIN_ADJUSTMENT',
    },
    referenceId: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    performedBy: {
      type: DataTypes.STRING(100),
      defaultValue: 'ADMIN',
    },
  },
  {
    sequelize,
    tableName: 'wallet_transactions',
    updatedAt: false,
    indexes: [{ fields: ['customer_id'] }],
  }
);

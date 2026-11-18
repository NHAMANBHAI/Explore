import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export interface OrderItemAttributes {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  title: string;
  unitPrice: number;
  quantity: number;
  gstRate: number;
  gstAmount: number;
  totalRowPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class OrderItem extends Model<OrderItemAttributes> implements OrderItemAttributes {
  public id!: string;
  public orderId!: string;
  public productId!: string;
  public variantId?: string;
  public title!: string;
  public unitPrice!: number;
  public quantity!: number;
  public gstRate!: number;
  public gstAmount!: number;
  public totalRowPrice!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    variantId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gstRate: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 18.00,
    },
    gstAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
    totalRowPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'order_items',
    indexes: [
      { fields: ['order_id'] },
      { fields: ['product_id'] },
    ],
  }
);

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export interface ProductVariantAttributes {
  id: string;
  productId: string;
  title: string;
  sku: string;
  barcode?: string;
  price: number;
  comparePrice?: number;
  stockQuantity: number;
  attributesJson: string;
  isAvailable: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ProductVariant extends Model<ProductVariantAttributes> implements ProductVariantAttributes {
  public id!: string;
  public productId!: string;
  public title!: string;
  public sku!: string;
  public barcode?: string;
  public price!: number;
  public comparePrice?: number;
  public stockQuantity!: number;
  public attributesJson!: string;
  public isAvailable!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductVariant.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    barcode: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    comparePrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
    },
    attributesJson: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'product_variants',
    indexes: [
      { unique: true, fields: ['sku'] },
      { fields: ['product_id'] },
    ],
  }
);

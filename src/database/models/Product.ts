import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export interface ProductAttributes {
  id: string;
  storeId: string;
  categoryId: string;
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  brand?: string;
  hsnCode?: string;
  gstRate: number;
  basePrice: number;
  comparePrice?: number;
  costPrice?: number;
  sku: string;
  barcode?: string;
  stockQuantity: number;
  lowStockAlert: number;
  unitType: string;
  isVeg: boolean;
  isPerishable: boolean;
  isActive: boolean;
  isFeatured: boolean;
  imagesJson: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: string;
  public storeId!: string;
  public categoryId!: string;
  public title!: string;
  public slug!: string;
  public shortDescription?: string;
  public description?: string;
  public brand?: string;
  public hsnCode?: string;
  public gstRate!: number;
  public basePrice!: number;
  public comparePrice?: number;
  public costPrice?: number;
  public sku!: string;
  public barcode?: string;
  public stockQuantity!: number;
  public lowStockAlert!: number;
  public unitType!: string;
  public isVeg!: boolean;
  public isPerishable!: boolean;
  public isActive!: boolean;
  public isFeatured!: boolean;
  public imagesJson!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    storeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    hsnCode: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    gstRate: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 18.00,
    },
    basePrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    comparePrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    costPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
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
    stockQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
    },
    lowStockAlert: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    unitType: {
      type: DataTypes.STRING(30),
      defaultValue: 'PIECE',
    },
    isVeg: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isPerishable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    imagesJson: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
    },
  },
  {
    sequelize,
    tableName: 'products',
    indexes: [
      { unique: true, fields: ['slug'] },
      { unique: true, fields: ['sku'] },
      { fields: ['store_id'] },
      { fields: ['category_id'] },
    ],
  }
);

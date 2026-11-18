import { sequelize } from '../sequelize';
import { User } from './User';
import { Customer } from './Customer';
import { Address } from './Address';
import { WalletTransaction } from './WalletTransaction';
import { LoyaltyTransaction } from './LoyaltyTransaction';
import { Store } from './Store';
import { Category } from './Category';
import { Product } from './Product';
import { ProductVariant } from './ProductVariant';
import { Order } from './Order';
import { OrderItem } from './OrderItem';
import { DeliveryZone } from './DeliveryZone';
import { DeliveryRider } from './DeliveryRider';
import { SystemSetting } from './SystemSetting';
import { UniversalBooking } from './UniversalBooking';

// ---------------------------------------------------------------------
// Define Sequelize Model Associations
// ---------------------------------------------------------------------

// User <-> Customer (1:1 optional)
User.hasOne(Customer, { foreignKey: 'userId', as: 'customerProfile' });
Customer.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User <-> DeliveryRider (1:1 optional)
User.hasOne(DeliveryRider, { foreignKey: 'userId', as: 'riderProfile' });
DeliveryRider.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Customer <-> Address (1:N)
Customer.hasMany(Address, { foreignKey: 'customerId', as: 'addresses', onDelete: 'CASCADE' });
Address.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });

// Customer <-> WalletTransaction (1:N)
Customer.hasMany(WalletTransaction, { foreignKey: 'customerId', as: 'walletTransactions', onDelete: 'CASCADE' });
WalletTransaction.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });

// Customer <-> LoyaltyTransaction (1:N)
Customer.hasMany(LoyaltyTransaction, { foreignKey: 'customerId', as: 'loyaltyTransactions', onDelete: 'CASCADE' });
LoyaltyTransaction.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });

// Store <-> Product (1:N)
Store.hasMany(Product, { foreignKey: 'storeId', as: 'products', onDelete: 'CASCADE' });
Product.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });

// Category <-> Product (1:N)
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Category self-relation (Hierarchical Parent/Child)
Category.hasMany(Category, { foreignKey: 'parentId', as: 'children' });
Category.belongsTo(Category, { foreignKey: 'parentId', as: 'parent' });

// Product <-> ProductVariant (1:N)
Product.hasMany(ProductVariant, { foreignKey: 'productId', as: 'variants', onDelete: 'CASCADE' });
ProductVariant.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Customer <-> Order (1:N)
Customer.hasMany(Order, { foreignKey: 'customerId', as: 'orders' });
Order.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });

// Store <-> Order (1:N)
Store.hasMany(Order, { foreignKey: 'storeId', as: 'orders' });
Order.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });

// DeliveryRider <-> Order (1:N)
DeliveryRider.hasMany(Order, { foreignKey: 'riderId', as: 'assignedOrders' });
Order.belongsTo(DeliveryRider, { foreignKey: 'riderId', as: 'rider' });

// Order <-> OrderItem (1:N)
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

// Product <-> OrderItem (1:N)
Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Store <-> UniversalBooking (1:N)
Store.hasMany(UniversalBooking, { foreignKey: 'storeId', as: 'bookings', onDelete: 'CASCADE' });
UniversalBooking.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });

// Customer <-> UniversalBooking (1:N optional)
Customer.hasMany(UniversalBooking, { foreignKey: 'customerId', as: 'bookings' });
UniversalBooking.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });

// ---------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------
export {
  sequelize,
  User,
  Customer,
  Address,
  WalletTransaction,
  LoyaltyTransaction,
  Store,
  Category,
  Product,
  ProductVariant,
  Order,
  OrderItem,
  DeliveryZone,
  DeliveryRider,
  SystemSetting,
  UniversalBooking,
};

export async function initDatabase(alter = false) {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter });
    console.log('✅ MySQL Database & Sequelize Models Synced successfully.');
    return { success: true };
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    return { success: false, error };
  }
}

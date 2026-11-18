-- =====================================================================
-- HyperLocal Multi-Vendor & FlexiCommerce MySQL Database Schema
-- Dialect: MySQL 8.0+ / MariaDB (InnoDB, utf8mb4)
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `hyperlocal_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `hyperlocal_db`;

-- Disable foreign key checks for clean creation
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) DEFAULT NULL,
  `role` ENUM('SUPER_ADMIN', 'STORE_MANAGER', 'DISPATCHER', 'FINANCE_ADMIN', 'RIDER') NOT NULL DEFAULT 'SUPER_ADMIN',
  `avatar_url` TEXT DEFAULT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `email_verified` TINYINT(1) NOT NULL DEFAULT 0,
  `phone_verified` TINYINT(1) NOT NULL DEFAULT 0,
  `two_factor_enabled` TINYINT(1) NOT NULL DEFAULT 0,
  `status` ENUM('ACTIVE', 'SUSPENDED', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_users_email` (`email`),
  UNIQUE KEY `idx_users_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Customers Table (Customer 360)
CREATE TABLE IF NOT EXISTS `customers` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) DEFAULT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `mobile` VARCHAR(20) NOT NULL,
  `country_code` VARCHAR(10) NOT NULL DEFAULT '+91',
  `avatar_url` TEXT DEFAULT NULL,
  `status` ENUM('ACTIVE', 'BLOCKED', 'SUSPENDED') NOT NULL DEFAULT 'ACTIVE',
  `kyc_status` ENUM('VERIFIED', 'PENDING', 'REJECTED') NOT NULL DEFAULT 'VERIFIED',
  `referral_code` VARCHAR(50) NOT NULL,
  `referred_by_code` VARCHAR(50) DEFAULT NULL,
  `wallet_balance` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `loyalty_points` INT NOT NULL DEFAULT 0,
  `total_orders_count` INT NOT NULL DEFAULT 0,
  `total_spent_amount` DECIMAL(14,2) NOT NULL DEFAULT 0.00,
  `last_order_at` DATETIME DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_customers_email` (`email`),
  UNIQUE KEY `idx_customers_mobile` (`mobile`),
  UNIQUE KEY `idx_customers_referral_code` (`referral_code`),
  CONSTRAINT `fk_customers_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Customer Delivery Addresses
CREATE TABLE IF NOT EXISTS `addresses` (
  `id` VARCHAR(36) NOT NULL,
  `customer_id` VARCHAR(36) NOT NULL,
  `type` ENUM('HOME', 'WORK', 'OTHER') NOT NULL DEFAULT 'HOME',
  `street` TEXT NOT NULL,
  `landmark` VARCHAR(255) DEFAULT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `postal_code` VARCHAR(20) NOT NULL,
  `country` VARCHAR(100) NOT NULL DEFAULT 'India',
  `latitude` DOUBLE DEFAULT NULL,
  `longitude` DOUBLE DEFAULT NULL,
  `is_default` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_addresses_customer_id` (`customer_id`),
  CONSTRAINT `fk_addresses_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Customer Wallet Ledger
CREATE TABLE IF NOT EXISTS `wallet_transactions` (
  `id` VARCHAR(36) NOT NULL,
  `customer_id` VARCHAR(36) NOT NULL,
  `amount` DECIMAL(12,2) NOT NULL,
  `type` ENUM('CREDIT', 'DEBIT') NOT NULL,
  `balance_after` DECIMAL(12,2) NOT NULL,
  `reference_type` VARCHAR(50) NOT NULL DEFAULT 'ADMIN_ADJUSTMENT',
  `reference_id` VARCHAR(100) DEFAULT NULL,
  `remarks` TEXT NOT NULL,
  `performed_by` VARCHAR(100) DEFAULT 'ADMIN',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_wallet_customer_id` (`customer_id`),
  CONSTRAINT `fk_wallet_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Customer Loyalty Points Ledger
CREATE TABLE IF NOT EXISTS `loyalty_transactions` (
  `id` VARCHAR(36) NOT NULL,
  `customer_id` VARCHAR(36) NOT NULL,
  `points` INT NOT NULL,
  `type` ENUM('CREDIT', 'DEBIT') NOT NULL,
  `balance_after` INT NOT NULL,
  `reason` VARCHAR(255) NOT NULL DEFAULT 'ADMIN_ADJUSTMENT',
  `performed_by` VARCHAR(100) DEFAULT 'ADMIN',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_loyalty_customer_id` (`customer_id`),
  CONSTRAINT `fk_loyalty_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Stores & Sellers Table
CREATE TABLE IF NOT EXISTS `stores` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `logo_url` TEXT DEFAULT NULL,
  `banner_url` TEXT DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `business_type` VARCHAR(50) NOT NULL DEFAULT 'RETAIL',
  `gstin` VARCHAR(30) DEFAULT NULL,
  `pan_number` VARCHAR(30) DEFAULT NULL,
  `fssai_number` VARCHAR(50) DEFAULT NULL,
  `commission_rate` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  `status` ENUM('PENDING', 'APPROVED', 'SUSPENDED') NOT NULL DEFAULT 'APPROVED',
  `bank_account_name` VARCHAR(255) DEFAULT NULL,
  `bank_account_number` VARCHAR(50) DEFAULT NULL,
  `bank_ifsc` VARCHAR(30) DEFAULT NULL,
  `opening_time` VARCHAR(20) NOT NULL DEFAULT '09:00',
  `closing_time` VARCHAR(20) NOT NULL DEFAULT '22:00',
  `is_open` TINYINT(1) NOT NULL DEFAULT 1,
  `avg_rating` DOUBLE NOT NULL DEFAULT 4.9,
  `total_reviews` INT NOT NULL DEFAULT 0,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `postal_code` VARCHAR(20) NOT NULL,
  `latitude` DOUBLE DEFAULT NULL,
  `longitude` DOUBLE DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_stores_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Categories Table
CREATE TABLE IF NOT EXISTS `categories` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `image_url` TEXT DEFAULT NULL,
  `parent_id` VARCHAR(36) DEFAULT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_categories_slug` (`slug`),
  CONSTRAINT `fk_categories_parent` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Products Table
CREATE TABLE IF NOT EXISTS `products` (
  `id` VARCHAR(36) NOT NULL,
  `store_id` VARCHAR(36) NOT NULL,
  `category_id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `short_description` TEXT DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `brand` VARCHAR(100) DEFAULT NULL,
  `hsn_code` VARCHAR(20) DEFAULT NULL,
  `gst_rate` DECIMAL(5,2) NOT NULL DEFAULT 18.00,
  `base_price` DECIMAL(12,2) NOT NULL,
  `compare_price` DECIMAL(12,2) DEFAULT NULL,
  `cost_price` DECIMAL(12,2) DEFAULT NULL,
  `sku` VARCHAR(100) NOT NULL,
  `barcode` VARCHAR(100) DEFAULT NULL,
  `stock_quantity` INT NOT NULL DEFAULT 100,
  `low_stock_alert` INT NOT NULL DEFAULT 10,
  `unit_type` VARCHAR(30) NOT NULL DEFAULT 'PIECE',
  `is_veg` TINYINT(1) NOT NULL DEFAULT 1,
  `is_perishable` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `images_json` TEXT DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_products_slug` (`slug`),
  UNIQUE KEY `idx_products_sku` (`sku`),
  KEY `idx_products_store_id` (`store_id`),
  KEY `idx_products_category_id` (`category_id`),
  CONSTRAINT `fk_products_store` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Delivery Zones Table
CREATE TABLE IF NOT EXISTS `delivery_zones` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `code` VARCHAR(50) NOT NULL,
  `coordinates_geojson` TEXT NOT NULL,
  `base_delivery_fee` DECIMAL(8,2) NOT NULL DEFAULT 30.00,
  `per_km_fee` DECIMAL(8,2) NOT NULL DEFAULT 8.00,
  `min_order_value` DECIMAL(10,2) NOT NULL DEFAULT 199.00,
  `max_radius_km` DOUBLE NOT NULL DEFAULT 12.0,
  `avg_delivery_minutes` INT NOT NULL DEFAULT 25,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_delivery_zones_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Delivery Riders / Fleet Table
CREATE TABLE IF NOT EXISTS `delivery_riders` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) DEFAULT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `mobile` VARCHAR(20) NOT NULL,
  `vehicle_type` ENUM('BIKE', 'EV_SCOOTER', 'CYCLE') NOT NULL DEFAULT 'BIKE',
  `vehicle_plate_number` VARCHAR(50) DEFAULT NULL,
  `license_number` VARCHAR(50) DEFAULT NULL,
  `current_lat` DOUBLE DEFAULT NULL,
  `current_lng` DOUBLE DEFAULT NULL,
  `status` ENUM('ONLINE', 'OFFLINE', 'BUSY') NOT NULL DEFAULT 'ONLINE',
  `rating` DOUBLE NOT NULL DEFAULT 4.9,
  `total_trips` INT NOT NULL DEFAULT 0,
  `total_cash_collected` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_delivery_riders_mobile` (`mobile`),
  CONSTRAINT `fk_delivery_riders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Orders Table
CREATE TABLE IF NOT EXISTS `orders` (
  `id` VARCHAR(36) NOT NULL,
  `order_number` VARCHAR(50) NOT NULL,
  `customer_id` VARCHAR(36) NOT NULL,
  `store_id` VARCHAR(36) NOT NULL,
  `rider_id` VARCHAR(36) DEFAULT NULL,
  `order_status` ENUM('RECEIVED', 'PREPARING', 'READY_FOR_PICKUP', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'REJECTED') NOT NULL DEFAULT 'RECEIVED',
  `payment_status` ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
  `payment_method` ENUM('UPI_QR', 'RAZORPAY', 'PHONEPE', 'CASH_ON_DELIVERY', 'WALLET') NOT NULL DEFAULT 'UPI_QR',
  `subtotal` DECIMAL(12,2) NOT NULL,
  `gst_tax_amount` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `delivery_fee` DECIMAL(8,2) NOT NULL DEFAULT 0.00,
  `discount_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `tip_amount` DECIMAL(8,2) NOT NULL DEFAULT 0.00,
  `total_amount` DECIMAL(12,2) NOT NULL,
  `delivery_address_json` TEXT NOT NULL,
  `delivery_slot` VARCHAR(100) DEFAULT NULL,
  `acceptance_countdown_seconds` INT DEFAULT 300,
  `acceptance_expires_at` DATETIME DEFAULT NULL,
  `delivery_otp` VARCHAR(10) DEFAULT '4921',
  `notes` TEXT DEFAULT NULL,
  `cancellation_reason` TEXT DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_orders_order_number` (`order_number`),
  KEY `idx_orders_customer_id` (`customer_id`),
  KEY `idx_orders_store_id` (`store_id`),
  KEY `idx_orders_rider_id` (`rider_id`),
  CONSTRAINT `fk_orders_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_orders_store` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_orders_rider` FOREIGN KEY (`rider_id`) REFERENCES `delivery_riders` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Order Items Table
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` VARCHAR(36) NOT NULL,
  `order_id` VARCHAR(36) NOT NULL,
  `product_id` VARCHAR(36) NOT NULL,
  `variant_id` VARCHAR(36) DEFAULT NULL,
  `title` VARCHAR(255) NOT NULL,
  `unit_price` DECIMAL(12,2) NOT NULL,
  `quantity` INT NOT NULL,
  `gst_rate` DECIMAL(5,2) NOT NULL DEFAULT 18.00,
  `gst_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `total_row_price` DECIMAL(12,2) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_order_items_order_id` (`order_id`),
  KEY `idx_order_items_product_id` (`product_id`),
  CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_order_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. System Settings Table
CREATE TABLE IF NOT EXISTS `system_settings` (
  `id` VARCHAR(36) NOT NULL,
  `key` VARCHAR(100) NOT NULL,
  `value` TEXT NOT NULL,
  `group` VARCHAR(50) NOT NULL DEFAULT 'GENERAL',
  `is_public` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_system_settings_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

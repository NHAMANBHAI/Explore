-- =====================================================================
-- HyperLocal Multi-Vendor & FlexiCommerce Database Schema (SQL DDL)
-- Compatible with PostgreSQL & MySQL / MariaDB
-- =====================================================================

-- 1. Users & Administrative Staff
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role VARCHAR(50) DEFAULT 'SUPER_ADMIN', -- SUPER_ADMIN, STORE_MANAGER, DISPATCHER, FINANCE_ADMIN, RIDER
    avatar_url TEXT,
    phone VARCHAR(20) UNIQUE,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    status VARCHAR(30) DEFAULT 'ACTIVE', -- ACTIVE, SUSPENDED, INACTIVE
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Customers & KYC
CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile VARCHAR(20) UNIQUE NOT NULL,
    country_code VARCHAR(10) DEFAULT '+91',
    avatar_url TEXT,
    status VARCHAR(30) DEFAULT 'ACTIVE', -- ACTIVE, BLOCKED, SUSPENDED
    kyc_status VARCHAR(30) DEFAULT 'VERIFIED', -- VERIFIED, PENDING, REJECTED
    referral_code VARCHAR(50) UNIQUE NOT NULL,
    referred_by_code VARCHAR(50),
    wallet_balance DECIMAL(12, 2) DEFAULT 0.00,
    loyalty_points INT DEFAULT 0,
    total_orders_count INT DEFAULT 0,
    total_spent_amount DECIMAL(14, 2) DEFAULT 0.00,
    last_order_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 3. Customer Delivery Addresses
CREATE TABLE IF NOT EXISTS addresses (
    id VARCHAR(36) PRIMARY KEY,
    customer_id VARCHAR(36) NOT NULL,
    type VARCHAR(30) DEFAULT 'HOME', -- HOME, WORK, OTHER
    street TEXT NOT NULL,
    landmark VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- 4. Customer Wallet Transactions (Audit-trail guaranteed)
CREATE TABLE IF NOT EXISTS wallet_transactions (
    id VARCHAR(36) PRIMARY KEY,
    customer_id VARCHAR(36) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    type VARCHAR(20) NOT NULL, -- CREDIT, DEBIT
    balance_after DECIMAL(12, 2) NOT NULL,
    reference_type VARCHAR(50) NOT NULL, -- ORDER_REFUND, ADMIN_ADJUSTMENT, CASHBACK, DEPOSIT, ORDER_PAYMENT
    reference_id VARCHAR(100),
    remarks TEXT NOT NULL,
    performed_by VARCHAR(36), -- User ID or 'SYSTEM'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- 5. Customer Loyalty Points Ledger
CREATE TABLE IF NOT EXISTS loyalty_transactions (
    id VARCHAR(36) PRIMARY KEY,
    customer_id VARCHAR(36) NOT NULL,
    points INT NOT NULL,
    type VARCHAR(20) NOT NULL, -- CREDIT, DEBIT
    balance_after INT NOT NULL,
    reason VARCHAR(255) NOT NULL, -- PURCHASE_REWARD, ADMIN_ADJUSTMENT, REDEMPTION, PROMOTIONAL_BONUS
    performed_by VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- 6. Multi-Vendor Stores / Sellers
CREATE TABLE IF NOT EXISTS stores (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    logo_url TEXT,
    banner_url TEXT,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    business_type VARCHAR(50) DEFAULT 'RETAIL', -- RETAIL, WHOLESALE, RESTAURANT, GROCERY
    gstin VARCHAR(30),
    pan_number VARCHAR(30),
    fssai_number VARCHAR(50),
    commission_rate DECIMAL(5, 2) DEFAULT 0.00,
    status VARCHAR(30) DEFAULT 'APPROVED', -- PENDING, APPROVED, SUSPENDED
    bank_account_name VARCHAR(255),
    bank_account_number VARCHAR(50),
    bank_ifsc VARCHAR(30),
    opening_time VARCHAR(20) DEFAULT '09:00',
    closing_time VARCHAR(20) DEFAULT '22:00',
    is_open BOOLEAN DEFAULT TRUE,
    avg_rating DOUBLE PRECISION DEFAULT 4.9,
    total_reviews INT DEFAULT 0,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Catalog Categories
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    parent_id VARCHAR(36),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- 8. Products
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(36) PRIMARY KEY,
    store_id VARCHAR(36) NOT NULL,
    category_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_description TEXT,
    description TEXT,
    brand VARCHAR(100),
    hsn_code VARCHAR(20),
    gst_rate DECIMAL(5, 2) DEFAULT 18.00,
    base_price DECIMAL(12, 2) NOT NULL,
    compare_price DECIMAL(12, 2),
    cost_price DECIMAL(12, 2),
    sku VARCHAR(100) UNIQUE NOT NULL,
    barcode VARCHAR(100),
    stock_quantity INT DEFAULT 100,
    low_stock_alert INT DEFAULT 10,
    unit_type VARCHAR(30) DEFAULT 'PIECE', -- PIECE, KG, GRAM, LITER, ML, PACK
    is_veg BOOLEAN DEFAULT TRUE,
    is_perishable BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    images_json TEXT DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

-- 9. Delivery Zones (Polygon Geofencing)
CREATE TABLE IF NOT EXISTS delivery_zones (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    coordinates_geojson TEXT NOT NULL,
    base_delivery_fee DECIMAL(8, 2) DEFAULT 30.00,
    per_km_fee DECIMAL(8, 2) DEFAULT 8.00,
    min_order_value DECIMAL(10, 2) DEFAULT 199.00,
    max_radius_km DOUBLE PRECISION DEFAULT 12.0,
    avg_delivery_minutes INT DEFAULT 25,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Delivery Riders / Fleet
CREATE TABLE IF NOT EXISTS delivery_riders (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) UNIQUE NOT NULL,
    vehicle_type VARCHAR(30) DEFAULT 'BIKE', -- BIKE, EV_SCOOTER, CYCLE
    vehicle_plate_number VARCHAR(50),
    license_number VARCHAR(50),
    current_lat DOUBLE PRECISION,
    current_lng DOUBLE PRECISION,
    status VARCHAR(30) DEFAULT 'ONLINE', -- ONLINE, OFFLINE, BUSY
    rating DOUBLE PRECISION DEFAULT 4.9,
    total_trips INT DEFAULT 0,
    total_cash_collected DECIMAL(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 11. Orders
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(36) PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id VARCHAR(36) NOT NULL,
    store_id VARCHAR(36) NOT NULL,
    rider_id VARCHAR(36),
    order_status VARCHAR(50) DEFAULT 'RECEIVED', -- RECEIVED, PREPARING, READY_FOR_PICKUP, OUT_FOR_DELIVERY, DELIVERED, CANCELLED, REJECTED
    payment_status VARCHAR(30) DEFAULT 'PENDING',  -- PENDING, PAID, FAILED, REFUNDED
    payment_method VARCHAR(50) DEFAULT 'UPI_QR',   -- UPI_QR, RAZORPAY, PHONEPE, CASH_ON_DELIVERY, WALLET
    subtotal DECIMAL(12, 2) NOT NULL,
    gst_tax_amount DECIMAL(12, 2) DEFAULT 0.00,
    delivery_fee DECIMAL(8, 2) DEFAULT 0.00,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    tip_amount DECIMAL(8, 2) DEFAULT 0.00,
    total_amount DECIMAL(12, 2) NOT NULL,
    delivery_address_json TEXT NOT NULL,
    delivery_slot VARCHAR(100),
    acceptance_countdown_seconds INT DEFAULT 300,
    acceptance_expires_at TIMESTAMP,
    delivery_otp VARCHAR(10) DEFAULT '4921',
    notes TEXT,
    cancellation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE RESTRICT,
    FOREIGN KEY (rider_id) REFERENCES delivery_riders(id) ON DELETE SET NULL
);

-- 12. Order Items
CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    unit_price DECIMAL(12, 2) NOT NULL,
    quantity INT NOT NULL,
    gst_rate DECIMAL(5, 2) DEFAULT 18.00,
    gst_amount DECIMAL(10, 2) DEFAULT 0.00,
    total_row_price DECIMAL(12, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- 13. System Key-Value Settings
CREATE TABLE IF NOT EXISTS system_settings (
    id VARCHAR(36) PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    group_name VARCHAR(50) DEFAULT 'GENERAL',
    is_public BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for high-performance indexing
CREATE INDEX idx_customers_mobile ON customers(mobile);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_orders_store ON orders(store_id);
CREATE INDEX idx_products_store ON products(store_id);
CREATE INDEX idx_products_category ON products(category_id);

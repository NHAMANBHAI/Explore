import { Sequelize } from 'sequelize';

// Database connection configuration for MySQL
const dbName = process.env.DB_NAME || 'hyperlocal_db';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbPort = Number(process.env.DB_PORT) || 3306;

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? (msg) => console.log(`[Sequelize] ${msg}`) : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    connectTimeout: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  },
});

// Helper function to test MySQL database connection
export async function testConnection(): Promise<{ connected: boolean; message: string }> {
  try {
    await sequelize.authenticate();
    return { connected: true, message: `Connected to MySQL database "${dbName}" at ${dbHost}:${dbPort}` };
  } catch (error: any) {
    const errorMsg = error?.message || 'Unknown database connection error';
    console.warn(`[Sequelize Warning] MySQL connection failed (${errorMsg}). Fallback to mock API active.`);
    return { connected: false, message: errorMsg };
  }
}

// Database synchronizer
export async function syncDatabase(options = { alter: true }): Promise<{ success: boolean; message: string }> {
  try {
    await sequelize.sync(options);
    return { success: true, message: 'All Sequelize MySQL tables synchronized successfully.' };
  } catch (error: any) {
    console.error('[Sequelize Error] Sync failed:', error);
    return { success: false, message: error?.message || 'Sync failed' };
  }
}

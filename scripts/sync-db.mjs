import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.DB_NAME || 'hyperlocal_db';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbPort = Number(process.env.DB_PORT) || 3306;

console.log(`Connecting to MySQL database "${dbName}" at ${dbHost}:${dbPort} as user "${dbUser}"...`);

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: console.log,
});

async function run() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to MySQL successfully.');
    console.log('Synchronizing all models with MySQL database...');
    // We import or run sync
    await sequelize.sync({ alter: true });
    console.log('🎉 All MySQL tables created/altered successfully!');
  } catch (err) {
    console.error('❌ Connection or sync error:', err.message);
    console.log('💡 Note: Ensure your local MySQL server (XAMPP / WampServer / Docker / MySQL Community Server) is running on port ' + dbPort);
  } finally {
    await sequelize.close();
  }
}

run();

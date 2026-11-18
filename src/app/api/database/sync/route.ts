import { NextResponse } from 'next/server';
import { testConnection, syncDatabase } from '@/database/sequelize';
import '@/database/models'; // Register all models and associations

export async function GET() {
  const status = await testConnection();
  return NextResponse.json({
    status: status.connected ? 'online' : 'offline',
    message: status.message,
    database: process.env.DB_NAME || 'hyperlocal_db',
    dialect: 'mysql',
    timestamp: new Date().toISOString(),
  });
}

export async function POST() {
  const res = await syncDatabase({ alter: true });
  return NextResponse.json({
    success: res.success,
    message: res.message,
    timestamp: new Date().toISOString(),
  });
}

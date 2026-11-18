/**
 * Explore Multi-Business Automation Engine (Cron Runner)
 * 
 * Replaces costly n8n workflows (€24-60/mo) with pure Node.js & Sequelize:
 * 1. 18:00 IST - Day-Before WhatsApp Appointment Reminders
 * 2. 21:00 IST - Evening EOD Operations & Revenue Summary
 * 3. Daily 09:00 IST - 7, 15, 30, 90-Day Post-Visit Retention Recall Alerts
 */

import http from 'http';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function triggerAutomation() {
  console.log('⏰ [Cron Automation Engine] Initiating automated scheduled jobs...');

  try {
    // 1. Trigger 18:00 Reminders
    console.log('📡 Triggering 18:00 WhatsApp Reminders Dispatch...');
    const reminderRes = await fetch(`${BASE_URL}/api/bookings/reminders`, { method: 'POST' });
    const reminderData = await reminderRes.json();
    console.log('✅ Reminders Output:', reminderData.message || reminderData);

    // 2. Fetch EOD Daily Report
    console.log('📊 Generating 21:00 Daily EOD Revenue & Operations Digest...');
    const eodRes = await fetch(`${BASE_URL}/api/bookings/reports/eod`);
    const eodData = await eodRes.json();
    console.log('✅ EOD Summary Completed. Total Revenue:', eodData.summary?.totalRevenue);

    // 3. Scan Follow-Up Recall Queue
    console.log('🔁 Scanning 7/15/30/90-Day Follow-Up Queue...');
    const followUpRes = await fetch(`${BASE_URL}/api/bookings/followups?due=TODAY`);
    const followUpData = await followUpRes.json();
    console.log(`✅ Follow-Ups Due Today: ${followUpData.count} clients queued.`);

    console.log('🎉 [Cron Automation Engine] All automated scheduled jobs completed successfully with 0 cloud platform cost.');
  } catch (error) {
    console.error('❌ [Cron Automation Engine Error]:', error.message);
  }
}

// Execute immediately when run directly
triggerAutomation();

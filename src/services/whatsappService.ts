/**
 * Meta WhatsApp Cloud API Service
 * Pluggable service with graceful simulation fallback when API keys are not configured.
 */

export interface WhatsAppMessagePayload {
  to: string;
  recipientName?: string;
  templateName?: string;
  bodyText?: string;
  parameters?: Record<string, string>;
}

export interface WhatsAppSendResult {
  success: boolean;
  messageId: string;
  simulated: boolean;
  error?: string;
}

export async function sendWhatsAppMessage(payload: WhatsAppMessagePayload): Promise<WhatsAppSendResult> {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  // Clean phone number: remove non-numeric characters, add country code if missing
  let cleanPhone = payload.to.replace(/\D/g, '');
  if (cleanPhone.length === 10) cleanPhone = '91' + cleanPhone;

  if (token && phoneNumberId) {
    try {
      const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;
      const body = payload.bodyText
        ? {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: cleanPhone,
            type: 'text',
            text: { preview_url: false, body: payload.bodyText }
          }
        : {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: cleanPhone,
            type: 'template',
            template: {
              name: payload.templateName || 'booking_reminder',
              language: { code: 'en_US' }
            }
          };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          messageId: 'err_' + Date.now(),
          simulated: false,
          error: data.error?.message || 'Meta API error'
        };
      }

      return {
        success: true,
        messageId: data.messages?.[0]?.id || 'wamid_' + Date.now(),
        simulated: false
      };
    } catch (err: any) {
      console.warn('[WhatsAppService] Network error, falling back to simulated dispatch:', err.message);
    }
  }

  // Graceful simulation fallback
  const simulatedId = 'sim_wamid_' + Math.random().toString(36).substring(2, 10).toUpperCase();
  console.log(`[WhatsApp Simulated] -> To: ${cleanPhone} | Msg: ${payload.bodyText || payload.templateName}`);
  return {
    success: true,
    messageId: simulatedId,
    simulated: true
  };
}

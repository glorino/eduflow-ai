import prisma from './prisma';

interface SMSOptions {
  to: string;
  message: string;
}

export async function sendSMS(options: SMSOptions): Promise<boolean> {
  try {
    // Twilio integration
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const fromNumber = process.env.TWILIO_PHONE_NUMBER;

      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            To: options.to,
            From: fromNumber!,
            Body: options.message,
          }),
        }
      );

      return response.ok;
    }

    // Fallback: log SMS
    console.log(`[SMS] To: ${options.to} | Message: ${options.message}`);
    return true;
  } catch (error) {
    console.error('SMS send failed:', error);
    return false;
  }
}

export async function sendBulkSMS(
  recipients: Array<{ phone: string; message: string }>
): Promise<{ sent: number; failed: number }> {
  let sent = 0;
  let failed = 0;

  for (const recipient of recipients) {
    const success = await sendSMS({ to: recipient.phone, message: recipient.message });
    if (success) sent++;
    else failed++;
  }

  return { sent, failed };
}

export async function logNotification(
  userId: string,
  title: string,
  message: string,
  channel: 'IN_APP' | 'EMAIL' | 'SMS' | 'PUSH' | 'WHATSAPP'
) {
  await prisma.notification.create({
    data: {
      userId,
      title,
      message,
      channel,
    },
  });
}

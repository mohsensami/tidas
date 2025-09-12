// lib/zarinpal.ts

const ZARINPAL_BASE = "https://sandbox.zarinpal.com/pg/v4";
const MERCHANT_ID = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"; // مرچنت تستی

export async function createPayment(
  amount: number,
  description: string,
  callback_url: string
) {
  const res = await fetch(`${ZARINPAL_BASE}/payment/request.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merchant_id: MERCHANT_ID,
      amount,
      callback_url,
      description,
    }),
    cache: "no-store",
  });

  const data = await res.json();
  return data;
}

export async function verifyPayment(amount: number, authority: string) {
  const res = await fetch(`${ZARINPAL_BASE}/payment/verify.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merchant_id: MERCHANT_ID,
      amount,
      authority,
    }),
    cache: "no-store",
  });

  const data = await res.json();
  return data;
}

import { NextResponse } from "next/server";

const OUNCE_TO_GRAM = 31.1034768; // وزن یک انس تروا به گرم
const KARAT_18_PURITY = 0.75; // خلوص طلای ۱۸ عیار

export async function GET() {
  const apiKey = process.env.METALPRICE_KEY; // کلید API را در Vercel تعریف کن
  if (!apiKey) {
    return NextResponse.json({ error: "API key missing" }, { status: 500 });
  }

  try {
    // توجه: base=USD & symbols=XAU یعنی "۱ دلار = چند انس طلا"
    // باید معکوس کنیم تا "۱ انس = چند دلار" بدست بیاد
    const res = await fetch(
      `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=USD&symbols=XAU`,
      { next: { revalidate: 60 } } // کش سمت سرور: هر ۶۰ ثانیه یکبار
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "External API error" },
        { status: 502 }
      );
    }

    const data = await res.json();

    // اینجا مقدار "چند انس در هر دلار" داریم
    const rate = data.rates?.XAU;
    if (!rate) {
      return NextResponse.json({ error: "No XAU data" }, { status: 500 });
    }

    // معکوس: قیمت ۱ انس طلا به دلار
    const ouncePrice24k = 1 / rate;

    // محاسبه قیمت هر گرم طلای ۱۸ عیار
    const gram18kPrice = (ouncePrice24k / OUNCE_TO_GRAM) * KARAT_18_PURITY;

    const payload = {
      ouncePrice24k, // قیمت انس ۲۴ عیار (دلار)
      gram18kPrice, // قیمت ۱ گرم ۱۸ عیار (دلار)
      currency: "USD",
      timestamp: new Date().toISOString(),
    };

    const response = NextResponse.json(payload);

    // کش روی CDN (Vercel Edge): ۶۰ ثانیه
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=30"
    );

    return response;
  } catch (err) {
    return NextResponse.json(
      { error: "Fetch failed", detail: String(err) },
      { status: 500 }
    );
  }
}

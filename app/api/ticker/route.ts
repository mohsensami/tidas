import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    `https://brsapi.ir/Api/Market/Gold_Currency.php?key=${process.env.BRSAPI_KEY}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return NextResponse.json(data);
}

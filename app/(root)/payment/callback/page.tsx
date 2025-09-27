"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { checkOrderZarrinPal } from "@/lib/actions/order.actions";

export default function CallbackPage() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const Authority = params.get("Authority");
    const Status = params.get("Status");

    if (Authority && Status) {
      checkOrderZarrinPal(Authority, Status).then((res) => setResult(res));
    }
  }, []);

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-lg text-gray-600 animate-pulse">در حال بررسی...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-96 p-4">
      <Card className="max-w-md w-full shadow-2xl rounded-2xl border border-gray-200">
        <CardHeader className="text-center">
          {result.ok ? (
            <>
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
              <CardTitle className="mt-2 text-2xl font-bold text-green-700">
                پرداخت موفق
              </CardTitle>
              <CardDescription className="text-gray-600">
                تراکنش با موفقیت انجام شد
              </CardDescription>
            </>
          ) : (
            <>
              <XCircle className="mx-auto h-12 w-12 text-red-500" />
              <CardTitle className="mt-2 text-2xl font-bold text-red-700">
                پرداخت ناموفق
              </CardTitle>
              <CardDescription className="text-gray-600">
                متاسفانه تراکنش کامل نشد
              </CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          {result.ok && (
            <div className="p-3 rounded-lg bg-green-50 text-green-700 font-mono">
              کد رهگیری: {result.ref_id}
            </div>
          )}
          {!result.ok && result.error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 font-mono">
              خطا: {result.error}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

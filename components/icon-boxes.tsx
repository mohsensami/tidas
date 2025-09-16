import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Headset, ShoppingBag, WalletCards } from "lucide-react";

const IconBoxes = () => {
  return (
    <div>
      <Card>
        <CardContent className="grid gap-4 md:grid-cols-4 p-4 ">
          <div className="space-y-2">
            <ShoppingBag />
            <div className="text-sm font-bold">ارسال رایگان</div>
            <div className="text-sm text-muted-foreground">
              ارسال رایگان برای سفارش‌های بالای ۱۰۰ دلار
            </div>
          </div>
          <div className="space-y-2">
            <DollarSign />
            <div className="text-sm font-bold">ضمانت بازگشت وجه</div>
            <div className="text-sm text-muted-foreground">
              تا ۳۰ روز برای تعویض یا بازگشت
            </div>
          </div>
          <div className="space-y-2">
            <WalletCards />
            <div className="text-sm font-bold">پرداخت انعطاف‌پذیر</div>
            <div className="text-sm text-muted-foreground">
              پرداخت با کارت اعتباری، پی‌پال یا پرداخت در محل
            </div>
          </div>
          <div className="space-y-2">
            <Headset />
            <div className="text-sm font-bold">پشتیبانی ۲۴/۷</div>
            <div className="text-sm text-muted-foreground">
              پشتیبانی در هر زمان شبانه‌روز
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default IconBoxes;

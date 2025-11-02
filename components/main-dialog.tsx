"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function MainDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">نمایش دیالوگ</Button>
      </DialogTrigger> */}

      <DialogContent className="sm:max-w-[450px] text-right">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-bold text-rose-600">
            🎉 تخفیف ویژه!
          </DialogTitle>
          <DialogDescription
            dir="rtl"
            className="text-gray-600 leading-relaxed text-right"
          >
            فقط تا پایان امروز می‌توانید از{" "}
            <span className="font-semibold text-rose-500">۳۰٪ تخفیف</span> روی
            تمام محصولات استفاده کنید. فرصت رو از دست نده!
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 border-t border-gray-200 mt-2">
          <p className="text-sm text-gray-700">
            برای استفاده از تخفیف، روی دکمه زیر کلیک کنید 👇
          </p>
        </div>

        <DialogFooter className="flex justify-end gap-3">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-xl">
              بستن
            </Button>
          </DialogClose>
          <Button className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl">
            دریافت تخفیف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

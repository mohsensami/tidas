"use client";

import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, TrendingUp, TrendingDown } from "lucide-react";

type Item = {
  name: string;
  price: number;
  change_percent: number;
  unit: string;
};

export default function GoldTicker() {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/ticker", { cache: "no-store" });
        const json = await res.json();

        const gold = json.gold?.map((g: any) => ({
          name: g.name,
          price: g.price,
          change_percent: g.change_percent,
          unit: g.unit,
        }));

        const currency = json.currency
          ?.filter((c: any) => ["USD", "EUR", "USDT_IRT"].includes(c.symbol))
          .map((c: any) => ({
            name: c.name,
            price: c.price,
            change_percent: c.change_percent,
            unit: c.unit,
          }));

        setData([...(gold || []), ...(currency || [])]);
      } catch (e) {
        console.error("Failed to fetch ticker data", e);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Drawer>
      {/* دکمه باز کردن Drawer */}
      <DrawerTrigger asChild>
        <Button className="fixed top-1/4 left-4 rotate-90 origin-left rounded-tr-none rounded-br-none z-10">
          💰 نمایش قیمت طلا و ارز
        </Button>
      </DrawerTrigger>

      <DrawerContent className="w-80 bg-yellow-50">
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-between">
            📊 قیمت لحظه‌ای
            <DrawerClose asChild>
              <Button variant="ghost" size="sm">
                <ChevronLeft />
              </Button>
            </DrawerClose>
          </DrawerTitle>
          <DrawerDescription>
            قیمت طلا و ارز بصورت لحظه‌ای و آپدیت شده
          </DrawerDescription>
        </DrawerHeader>

        <div className="space-y-2 overflow-y-auto p-4">
          {data.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-2 bg-white rounded shadow-sm"
            >
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="ml-1 text-gray-500 text-sm">
                  ({item.unit})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {item.price.toLocaleString()}
                </span>
                <span
                  className={`text-sm flex items-center gap-1 ${
                    item.change_percent > 0
                      ? "text-green-600"
                      : item.change_percent < 0
                        ? "text-red-600"
                        : "text-gray-500"
                  }`}
                >
                  {item.change_percent > 0 ? (
                    <TrendingUp size={14} />
                  ) : item.change_percent < 0 ? (
                    <TrendingDown size={14} />
                  ) : null}
                  {item.change_percent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

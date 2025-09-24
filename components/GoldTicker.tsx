"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Item = {
  name: string;
  price: number;
  change_percent: number;
  unit: string;
};

export default function GoldTicker() {
  const [data, setData] = useState<Item[]>([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/ticker`, { cache: "no-store" });
        const json = await res.json();

        const gold = json.gold?.map((g: any) => ({
          name: g.name,
          price: g.price,
          change_percent: g.change_percent,
          unit: g.unit,
        }));

        const currency = json.currency
          ?.filter(
            (c: any) => ["USD", "EUR", "USDT_IRT"].includes(c.symbol) // دلار، یورو، تتر
          )
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
    const interval = setInterval(fetchData, 60000); // هر 1 دقیقه آپدیت
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-yellow-50 border-b border-yellow-200 text-sm">
      {/* هدر آکاردیون */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-2 bg-yellow-100 hover:bg-yellow-200 transition"
      >
        <span className="font-medium text-yellow-800">
          📊 قیمت لحظه‌ای طلا و ارز
        </span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* لیست داده‌ها */}
      {open && (
        <div className="overflow-x-auto whitespace-nowrap py-2 animate-slide">
          <div className="flex gap-6 px-4">
            {data.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="font-medium text-gray-800">{item.name}:</span>
                <span className="text-gray-900">
                  {item.price.toLocaleString()} {item.unit}
                </span>
                <span
                  className={`text-xs ${
                    item.change_percent > 0
                      ? "text-green-600"
                      : item.change_percent < 0
                        ? "text-red-600"
                        : "text-gray-500"
                  }`}
                >
                  {item.change_percent > 0
                    ? "▲"
                    : item.change_percent < 0
                      ? "▼"
                      : ""}
                  {item.change_percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

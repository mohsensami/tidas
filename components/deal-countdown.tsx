"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

// تابع محاسبه زمان باقی‌مانده
const calculateTimeRemaining = (targetDate: Date) => {
  const currentTime = new Date();
  const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0);
  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  };
};

type DealCountdownProps = {
  targetDate: Date; // دریافت تاریخ از بیرون
};

const DealCountdown = ({ targetDate }: DealCountdownProps) => {
  const [time, setTime] = useState<ReturnType<typeof calculateTimeRemaining>>();

  useEffect(() => {
    setTime(calculateTimeRemaining(targetDate));

    const timerInterval = setInterval(() => {
      const newTime = calculateTimeRemaining(targetDate);
      setTime(newTime);

      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [targetDate]);

  // حالت بارگذاری
  if (!time) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 my-20">
        <div className="flex flex-col gap-2 justify-center">
          <h3 className="text-3xl font-bold">در حال بارگذاری شمارش معکوس...</h3>
        </div>
      </section>
    );
  }

  // وقتی شمارش معکوس تمام شد
  if (
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0
  ) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 my-20">
        <div className="flex flex-col gap-2 justify-center">
          <h3 className="text-3xl font-bold">تخفیف به پایان رسید</h3>
          <p>
            این پیشنهاد دیگر فعال نیست. جدیدترین تخفیف‌های ما را بررسی کنید!
          </p>
          <div className="text-center">
            <Button asChild>
              <Link href="/search">مشاهده محصولات</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/promo.png"
            alt="تخفیف ویژه"
            width={300}
            height={200}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 my-20">
      <div className="flex flex-col gap-2 justify-center">
        <h3 className="text-3xl font-bold">پیشنهاد ویژه </h3>
        <p>
          آماده‌ی یک تجربه‌ی خرید متفاوت باشید! 🎉 در پیشنهادهای ویژه‌ی این ماه،
          هر خرید همراه با امتیازات و تخفیف‌های اختصاصی است. این فرصت عالی را از
          دست ندهید! 🎁🛒
        </p>
        <ul className="grid grid-cols-4">
          <StatBox label="روز" value={time.days} />
          <StatBox label="ساعت" value={time.hours} />
          <StatBox label="دقیقه" value={time.minutes} />
          <StatBox label="ثانیه" value={time.seconds} />
        </ul>
        <div className="text-center">
          <Button asChild>
            <Link href="/search">مشاهده محصولات</Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-end">
        <Image
          src="/images/promo.png"
          alt="تخفیف ویژه"
          width={300}
          height={200}
        />
      </div>
    </section>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className="p-4 w-full text-center">
    <p className="text-3xl font-bold">{value}</p>
    <p>{label}</p>
  </li>
);

export default DealCountdown;

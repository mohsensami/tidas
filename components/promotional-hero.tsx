"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Slide = {
  title: string;
  subtitle: string;
  description: string[];
  image: string;
  link: string;
  bgColor?: string;
};

const SLIDES: Slide[] = [
  {
    title: "فروش ویژه طلاهای تخفیفی",
    subtitle: "زیبای خودرا بروز دهید",
    description: [
      "طلای سرمایه‌ای، انتخاب هوشمندانه!",
      "عرضه‌ی محدود با کمترین حاشیه سود",
      "📌 فقط فروش نقدی – بدون اقساط",
      "⏳ موجودی محدود – فرصت رو از دست نده!",
    ],
    image: "/images/slider.jpg",
    link: "/search?discount=true",
    bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
  },
  {
    title: "طلای بدون اجرت",
    subtitle: "تجربه یک خرید پر نشاط با نشاط",
    description: [
      "طلای اقساطی، با کمترین پیش قسط! بدون چک و ضامن",
      "📌 تسهیلات ویژه جهت بازنشستگان محترم",
      "⏳ موجودی محدود – فرصت رو از دست نده!",
    ],
    image: "https://talaghesti.com/assets/images/home-5/hero/01.png",
    link: "/search?installment=true",
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
  },
];

const AUTOPLAY_MS = 6000;

export default function PromotionalHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (paused || hidden) return;
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      AUTOPLAY_MS
    );
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [paused, hidden]);

  const next = () => setIndex((i) => (i + 1) % SLIDES.length);
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  const currentSlide = SLIDES[index];

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        {/* Background Image */}
        <div className="relative h-[500px] md:h-[850px] w-full">
          <Image
            src={currentSlide.image}
            alt={currentSlide.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="wrapper w-full">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div className="text-white space-y-4 z-10">
                <span className="inline-block text-sm md:text-base text-yellow-300 font-semibold">
                  {currentSlide.subtitle}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold">
                  {currentSlide.title}
                </h1>
                <div className="space-y-2">
                  {currentSlide.description.map((desc, i) => (
                    <p key={i} className="text-base md:text-lg">
                      {desc}
                    </p>
                  ))}
                </div>
                <Link href={currentSlide.link}>
                  <Button
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-6 text-lg"
                  >
                    خرید
                  </Button>
                </Link>
              </div>

              {/* Image Content */}
              <div className="hidden md:block relative z-10">
                <div className="relative h-[400px] w-full">
                  {/* <Image
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    fill
                    className="object-contain rounded-lg"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          aria-label="قبلی"
          onClick={prev}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/90 p-2 text-gray-800 shadow-lg hover:bg-white transition-colors"
        >
          <ChevronRight className="size-6" />
        </button>
        <button
          aria-label="بعدی"
          onClick={next}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/90 p-2 text-gray-800 shadow-lg hover:bg-white transition-colors"
        >
          <ChevronLeft className="size-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`اسلاید ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === index ? "bg-white" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

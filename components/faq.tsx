"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "چطور می‌توانم سفارشم را ثبت کنم؟",
    answer:
      "برای ثبت سفارش کافیست محصول موردنظر را به سبد خرید اضافه کرده و پس از وارد کردن اطلاعات تماس و پرداخت، سفارش شما ثبت خواهد شد.",
  },
  {
    id: "2",
    question: "روش‌های پرداخت چگونه است؟",
    answer:
      "شما می‌توانید از طریق درگاه بانکی آنلاین و همچنین کارت به کارت، هزینه سفارش خود را پرداخت کنید.",
  },
  {
    id: "3",
    question: "زمان تحویل سفارش چقدر است؟",
    answer:
      "بسته به شهر مقصد، سفارش‌ها معمولاً بین ۲ تا ۵ روز کاری تحویل داده می‌شوند. امکان تحویل حضوری در فروشگاه نیز وجود دارد.",
  },
  {
    id: "4",
    question: "آیا محصولات دارای فاکتور رسمی هستند؟",
    answer:
      "بله، تمامی محصولات تیداس گلد همراه با فاکتور رسمی و مهر فروشگاه ارائه می‌شوند.",
  },
  {
    id: "5",
    question: "آیا امکان بازگشت کالا وجود دارد؟",
    answer:
      "با توجه به ماهیت محصولات طلا، بازگشت کالا تنها در شرایط خاص (عیب یا مغایرت محصول) امکان‌پذیر است. لطفاً پیش از خرید به مشخصات دقت فرمایید.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-slate-50 py-12 md:py-16">
      <div className="wrapper">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-2xl font-extrabold text-slate-900 md:text-3xl">
            سوالات متداول
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-600 md:text-base">
            پاسخ پرسش‌های پرتکرار مشتریان تیداس گلد را می‌توانید در این بخش
            بیابید.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqData.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="rounded-lg border border-slate-200 bg-white px-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <AccordionTrigger className="text-right font-semibold text-slate-900 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-right text-slate-700">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

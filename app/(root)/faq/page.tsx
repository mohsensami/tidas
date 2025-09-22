"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function FAQ() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6 sm:px-8 lg:px-20">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-6 text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
        >
          سوالات متداول
        </motion.h1>

        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-slate-700">
          در این بخش پاسخ پرسش‌های پرتکرار مشتریان تیداس گلد را می‌توانید
          بیابید. اگر سوالی دارید که اینجا جوابش را پیدا نکردید، لطفاً با ما
          تماس بگیرید.
        </p>

        {/* FAQ List */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <h2 className="text-xl font-semibold text-slate-900">پرسش‌ها</h2>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  چطور می‌توانم سفارشم را ثبت کنم؟
                </AccordionTrigger>
                <AccordionContent>
                  برای ثبت سفارش کافیست محصول موردنظر را به سبد خرید اضافه کرده
                  و پس از وارد کردن اطلاعات تماس و پرداخت، سفارش شما ثبت خواهد
                  شد.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  آیا امکان بازگشت کالا وجود دارد؟
                </AccordionTrigger>
                <AccordionContent>
                  با توجه به ماهیت محصولات طلا، بازگشت کالا تنها در شرایط خاص
                  (عیب یا مغایرت محصول) امکان‌پذیر است. لطفاً پیش از خرید به
                  مشخصات دقت فرمایید.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>روش‌های پرداخت چگونه است؟</AccordionTrigger>
                <AccordionContent>
                  شما می‌توانید از طریق درگاه بانکی آنلاین و همچنین کارت به
                  کارت، هزینه سفارش خود را پرداخت کنید.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>زمان تحویل سفارش چقدر است؟</AccordionTrigger>
                <AccordionContent>
                  بسته به شهر مقصد، سفارش‌ها معمولاً بین ۲ تا ۵ روز کاری تحویل
                  داده می‌شوند. امکان تحویل حضوری در فروشگاه نیز وجود دارد.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  آیا محصولات دارای فاکتور رسمی هستند؟
                </AccordionTrigger>
                <AccordionContent>
                  بله، تمامی محصولات تیداس گلد همراه با فاکتور رسمی و مهر
                  فروشگاه ارائه می‌شوند.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

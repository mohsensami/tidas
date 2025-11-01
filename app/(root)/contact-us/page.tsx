"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6 sm:px-8 lg:px-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-6 text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
        >
          تماس با ما - تیداس گلد
        </motion.h1>

        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-slate-700">
          خوشحال می‌شویم از شما بشنویم. چه سوالی درباره محصولات داشته باشید، چه
          نیاز به مشاوره در خرید طلا، تیم ما آماده پاسخگویی است.
        </p>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Form */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <h2 className="text-xl font-semibold text-slate-900">فرم تماس</h2>
            </CardHeader>
            <CardContent>
              <form action="#" method="post" className="grid gap-4">
                <Input type="text" placeholder="نام و نام خانوادگی" required />
                <Input type="email" placeholder="ایمیل" required />
                <Input type="tel" placeholder="شماره تماس" required />
                <Textarea placeholder="پیام شما" required />
                <Button type="submit" className="w-full">
                  ارسال پیام
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <InfoCard
              icon={<Phone className="h-5 w-5" />}
              title="تلفن پشتیبانی"
              detail="021-12345678"
            />
            <InfoCard
              icon={<Mail className="h-5 w-5" />}
              title="ایمیل"
              detail="support@tidasgold.com"
            />
            <InfoCard
              icon={<MapPin className="h-5 w-5" />}
              title="آدرس فروشگاه"
              detail="تهران، خیابان ولیعصر، پاساژ طلا، پلاک 25"
            />

            <div className="rounded-2xl overflow-hidden border border-slate-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.3874434072186!2d51.479398599999996!3d35.6920822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e02843c668751%3A0x1bd9283979d055fb!2sPanorama%20Complex!5e0!3m2!1sen!2s!4v1762022622715!5m2!1sen!2s"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------------------- Subcomponents ---------------------- */

function InfoCard({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <Card className="flex items-center gap-4 p-4">
      <div className="rounded-md bg-slate-50 p-2 text-slate-700">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-sm text-slate-600">{detail}</p>
      </div>
    </Card>
  );
}

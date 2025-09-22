"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Check, Users, Flag, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Aboutus() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6 sm:px-8 lg:px-20">
      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <section className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
              دربارهٔ ما
            </motion.h1>
            <p className="mt-4 text-lg text-slate-700">
              ما تیمی از طراحان و توسعه‌دهندگانی هستیم که به ساخت تجربه‌های
              دیجیتال معنادار و پایدار معتقدیم. تمرکز ما روی سرعت، دسترسی و
              طراحی کاربرمحور است — همهٔ این‌ها در کنار هم برای رسیدن به محصولی
              که کاربران عاشقش شوند.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#values">ارزش‌ها</a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="#team">تیم</a>
              </Button>
            </div>
          </div>

          <div className="order-first lg:order-last">
            <Card className="bg-white p-6 shadow-md">
              <CardHeader className="px-0 pb-0">
                <h3 className="text-base font-semibold text-slate-900">
                  وظیفهٔ ما
                </h3>
              </CardHeader>
              <CardContent className="px-0 pt-3">
                <p className="text-slate-600">
                  هدف‌گذاری ما خلق راه‌حل‌های دیجیتال است که هم برای کسب‌و‌کارها
                  ارزش خلق کند و هم برای کاربران تجربه‌ای روان و دلپذیر فراهم
                  آورد. ما به تست، یادگیری و تکرار سریع باور داریم.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <Stat
                    icon={<Check className="h-4 w-4" />}
                    label="قابل اعتماد"
                    value="+5 سال"
                  />
                  <Stat
                    icon={<Users className="h-4 w-4" />}
                    label="تیم"
                    value="10+ نفر"
                  />
                  <Stat
                    icon={<Flag className="h-4 w-4" />}
                    label="پروژه‌ها"
                    value="50+"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section id="values" className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            ارزش‌های ما
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ValueCard title="دسترس‌پذیری" icon={<Heart className="h-5 w-5" />}>
              ما از ابتدا محصول را به‌گونه‌ای طراحی می‌کنیم که برای بیشترین طیف
              کاربران قابل استفاده باشد.
            </ValueCard>
            <ValueCard title="سرعت" icon={<Check className="h-5 w-5" />}>
              تجربهٔ سریع و روان اولویت اول ماست — هم در طراحی و هم در
              پیاده‌سازی.
            </ValueCard>
            <ValueCard title="شفافیت" icon={<Flag className="h-5 w-5" />}>
              در همکاری با مشتریان، تصمیمات فنی و تجاری را شفاف گزارش می‌دهیم.
            </ValueCard>
            <ValueCard title="یادگیری" icon={<Users className="h-5 w-5" />}>
              هر پروژه فرصتی برای یادگیری جدید است و این یادگیری‌ها را تبدیل به
              عادت می‌کنیم.
            </ValueCard>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">تیم</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <TeamMember
              name="الیسا رضایی"
              role="طراح ارشد"
              bio="علاقه‌مند به طراحی محصول، تحقیق کاربری و طراحی تجربهٔ کاربری مدرن"
            />
            <TeamMember
              name="سینا کاظمی"
              role="فرانت‌اند"
              bio="متخصص React و TypeScript؛ به عملکرد و کدنویسی تمیز اهمیت می‌دهد"
            />
            <TeamMember
              name="مریم حسینی"
              role="مدیر پروژه"
              bio="هماهنگ‌کنندهٔ تیم، مسئول فرایندها و تضمین کیفیت پروژه‌ها"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 p-8 text-white">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="text-2xl font-bold">می‌خواهید با هم کار کنیم؟</h3>
            <p className="mt-2 text-sm opacity-90">
              اگر پروژه‌ای دارید یا فقط می‌خواهید سلام کنید، خوشحال می‌شویم از
              شما بشنویم.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <Button asChild>
                <a href="/contact">تماس با ما</a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="/portfolio">نمونه‌کارها</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ---------------------- Subcomponents ---------------------- */

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-50">
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-base font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function ValueCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-4">
      <CardContent className="p-0">
        <div className="flex items-start gap-4">
          <div className="rounded-md bg-slate-50 p-2">{icon}</div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
            <p className="mt-1 text-sm text-slate-600">{children}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TeamMember({
  name,
  role,
  bio,
}: {
  name: string;
  role: string;
  bio: string;
}) {
  return (
    <Card className="flex items-center gap-4 p-4">
      <Avatar>
        <AvatarImage
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`}
          alt={name}
        />
        <AvatarFallback>{name.split(" ")[0][0]}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-semibold text-slate-900">{name}</p>
        <p className="text-xs text-slate-500">{role}</p>
        <p className="mt-2 text-xs text-slate-600">{bio}</p>
      </div>
    </Card>
  );
}

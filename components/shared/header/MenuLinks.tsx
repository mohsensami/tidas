"use client";

import * as React from "react";
import Link from "next/link";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "پنجره هشدار (Alert Dialog)",
    href: "/docs/primitives/alert-dialog",
    description:
      "یک پنجره گفت‌وگو که برای هشدار یا تأیید اطلاعات مهم استفاده می‌شود.",
  },
  {
    title: "کارت شناور (Hover Card)",
    href: "/docs/primitives/hover-card",
    description: "برای پیش‌نمایش محتوایی که پشت یک لینک یا دکمه قرار دارد.",
  },
  {
    title: "نوار پیشرفت (Progress)",
    href: "/docs/primitives/progress",
    description:
      "نمایش میزان پیشرفت یک فرایند یا عملیات، معمولاً به‌صورت نوار پیشرفت.",
  },
  {
    title: "ناحیه پیمایش (Scroll-area)",
    href: "/docs/primitives/scroll-area",
    description: "جداسازی بصری یا معنایی بخش‌های مختلف محتوا.",
  },
  {
    title: "زبانه‌ها (Tabs)",
    href: "/docs/primitives/tabs",
    description:
      "مجموعه‌ای از بخش‌های محتوایی که به‌صورت زبانه‌ای نمایش داده می‌شوند.",
  },
  {
    title: "راهنما (Tooltip)",
    href: "/docs/primitives/tooltip",
    description:
      "پنجره کوچکی که هنگام قرار گرفتن ماوس یا فوکوس بر یک عنصر نمایش داده می‌شود.",
  },
];

export function MenuLinks() {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu className="hidden md:block" viewport={isMobile}>
      <NavigationMenuList className="flex-wrap justify-end">
        {/* صفحه اصلی */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>صفحه اصلی</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      رابط کاربری Shadcn
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      مجموعه‌ای از کامپوننت‌های زیبا و کاربردی با Tailwind CSS.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="مقدمه">
                معرفی اجزاء و ساختار کلی رابط کاربری.
              </ListItem>
              <ListItem href="/docs/installation" title="نصب و راه‌اندازی">
                آموزش نصب وابستگی‌ها و ساختاردهی پروژه شما.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="تایپوگرافی">
                استایل‌ها و استانداردهای نوشتاری در پروژه.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* کامپوننت‌ها */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>اجزاء</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* مستندات */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">مستندات</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* لیست */}
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>لیست</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">اجزاء</div>
                    <div className="text-muted-foreground">
                      مشاهده تمام کامپوننت‌های موجود در کتابخانه.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">مستندات</div>
                    <div className="text-muted-foreground">
                      آموزش استفاده و تنظیمات هر بخش.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">وبلاگ</div>
                    <div className="text-muted-foreground">
                      مطالعه آخرین مقالات و بروزرسانی‌ها.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* ساده */}
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>ساده</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">اجزاء</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">مستندات</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">بلوک‌ها</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* آیکون‌دار */}
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>دارای آیکون</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleHelpIcon />
                    در انتظار
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleIcon />
                    در حال انجام
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleCheckIcon />
                    انجام‌شده
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// کامپوننت آیتم لیست
function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="block text-right">
          <div className="text-sm leading-none font-medium mb-1">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

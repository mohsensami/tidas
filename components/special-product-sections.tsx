import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Gift, Baby, Sparkles } from "lucide-react";

const specialSections = [
  {
    id: "gift",
    title: "مناسب هدیه",
    subtitle: "طلاهای سبک و نمادار و شیک جهت هدیه",
    icon: Gift,
    link: "/search?category=هدیه",
    image: "https://talaghesti.com/assets/images/home-5/hero/01.png",
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
  },
  {
    id: "baby",
    title: "کودک",
    subtitle: "طلاهای ظریف جهت کودکان و نوزادان عزیز",
    icon: Baby,
    link: "/search?category=کودک",
    image: "https://talaghesti.com/assets/images/home-5/category/02.png",
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
  },
  {
    id: "teen",
    title: "تین ایجری",
    subtitle: "آلبوم ویژه نوجوان - خاص، شیک، مفهومی و نماد",
    icon: Sparkles,
    link: "/search?category=نوجوان",
    image: "https://talaghesti.com/assets/images/home-5/category/04.png",
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
  },
];

export default function SpecialProductSections() {
  return (
    <section dir="rtl" className="py-12 bg-light-blue text-white">
      <div className="wrapper">
        <div className="grid md:grid-cols-3 gap-6">
          {specialSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.id}
                href={section.link}
                className="group text-dark-blue bg-dark-blue relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`${section.bgColor} p-8 h-full flex flex-col items-center text-center space-y-4`}
                >
                  <div className="relative w-32 h-32 rounded-full bg-white/80 p-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {/* <Icon className="w-16 h-16 text-gray-700" /> */}
                    <Image
                      src={section.image}
                      alt={section.title}
                      width={200}
                      height={200}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{section.subtitle}</p>
                  <Button
                    variant="outline"
                    className="mt-4 bg-white hover:bg-gray-100"
                  >
                    مشاهده
                  </Button>
                </div>
                {/* Decorative Image */}
                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover rounded-tl-2xl"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

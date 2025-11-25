import { ShieldCheck, RefreshCw, Headphones, CheckCircle } from "lucide-react";

const guarantees = [
  {
    icon: ShieldCheck,
    title: "تضمین 18 عیار",
    description: "برای تمام طلاهای شعبه‌ها",
  },
  {
    icon: RefreshCw,
    title: "تضمین بازگشت وجه",
    description: "به مدت یک هفته از تاریخ فاکتور",
  },
  {
    icon: Headphones,
    title: "پشتیبانی 24 ساعته",
    description: "پشتیبانی آنلاین 24 ساعته",
  },
  {
    icon: CheckCircle,
    title: "گارانتی معاوضه",
    description: "به مدت یکماه از تاریخ فاکتور",
  },
];

export default function GuaranteeSection() {
  return (
    <section dir="rtl" className="py-12 bg-light-blue text-white">
      <div className="wrapper">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg hover:cursor-pointer hover:bg-gray-50 transition-colors group"
              >
                <div className="rounded-full bg-yellow-100 p-4">
                  <Icon className="w-8 h-8 text-yellow-600" />
                </div>
                <h4 className="font-bold text-gold group-hover:text-gray-800">
                  {guarantee.title}
                </h4>
                <p className="text-sm text-gold group-hover:text-gray-600">
                  {guarantee.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ViewAllProductsButton = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center ">
      <Link
        href="/search"
        className="px-4 py-2 text-sm font-semibold bg-gold !text-dark-blue"
      >
        مشاهده همه محصولات
      </Link>
    </div>
  );
};

export default ViewAllProductsButton;

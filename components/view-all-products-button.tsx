"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ViewAllProductsButton = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center mt-8">
      <Button
        onClick={() => router.push("/search")}
        className="px-8 py-4 text-lg font-semibold"
      >
        مشاهده همه محصولات
      </Button>
    </div>
  );
};

export default ViewAllProductsButton;

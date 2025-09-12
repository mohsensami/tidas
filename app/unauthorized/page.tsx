import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "دسترسی غیرمجاز",
};

export default function UnauthorizedPage() {
  return (
    <div className="container mx-auto flex h-[calc(100vh-200px)] flex-col items-center justify-center space-y-4">
      <h1 className="h1-bold text-4xl">دسترسی غیرمجاز</h1>
      <p className="text-muted-foreground">
        شما اجازه دسترسی به این صفحه را ندارید.
      </p>
      <Button asChild>
        <Link href="/">صفحه نخست</Link>
      </Button>
    </div>
  );
}

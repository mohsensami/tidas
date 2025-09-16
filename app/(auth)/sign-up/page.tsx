import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignUpForm from "./signup-form";

export const metadata: Metadata = {
  title: "ثبت نام",
};

const SignUp = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const { callbackUrl } = searchParams;

  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className="items-center flex justify-center h-screen w-full">
      <Card className="md:w-2/3">
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              priority={true}
              src="/images/logo.jpg"
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
            />
          </Link>
          <CardTitle className="text-center">ثبت نام کنید</CardTitle>
          <CardDescription className="text-center">
            لطفا برای ثبت نام فرم زیر را پر کنید
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;

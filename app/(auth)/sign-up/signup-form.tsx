"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUp } from "@/lib/actions/user.actions";
import { AlertCircle } from "lucide-react";

const SignUpForm = () => {
  const [data, action] = useActionState(signUp, {
    message: "",
    success: false,
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "در حال ارسال اطلاعات" : "ثبت نام"}
      </Button>
    );
  };

  return (
    <form action={action}>
      {!data.success && (
        <div className="text-center text-destructive">
          {Array.isArray(data.message) ? (
            <ul className="flex flex-col gap-2 mb-2 text-sm leading-relaxed border border-red-100 rounded-lg p-2">
              {data.message.map((err, index) => (
                <li key={index} className="flex items-start bg-white/50 ">
                  <div>
                    <p className="text-xs">{err.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm">{data.message}</div>
          )}
        </div>
      )}
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label className=" text-sm" htmlFor="name">
              نام
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              defaultValue={signUpDefaultValues.name}
              autoComplete="name"
            />
          </div>
          <div className="flex-1">
            <Label className=" text-sm" htmlFor="nationalCode">
              کدملی
            </Label>
            <Input
              id="nationalCode"
              name="nationalCode"
              type="text"
              defaultValue={signUpDefaultValues.nationalCode}
              autoComplete="name"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <Label className=" text-sm" htmlFor="phoneNumber">
              تلفن همراه
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              defaultValue={signUpDefaultValues.phoneNumber}
              autoComplete="name"
            />
          </div>
          <div className="flex-1">
            <Label className=" text-sm" htmlFor="email">
              ایمیل
            </Label>
            <Input
              id="email"
              name="email"
              dir="ltr"
              type="email"
              defaultValue={signUpDefaultValues.email}
              autoComplete="email"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <Label className=" text-sm" htmlFor="password">
              رمز عبور
            </Label>
            <Input
              id="password"
              name="password"
              dir="ltr"
              type="password"
              defaultValue={signUpDefaultValues.password}
              autoComplete="current-password"
            />
          </div>
          <div className="flex-1">
            <Label className=" text-sm" htmlFor="confirmPassword">
              تکرار رمز عبور
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              dir="ltr"
              type="password"
              defaultValue={signUpDefaultValues.confirmPassword}
              autoComplete="current-password"
            />
          </div>
        </div>
        <div>
          <SignUpButton />
        </div>

        <div className="text-sm text-center text-muted-foreground">
          قبلا ثبت نام کرده اید؟{" "}
          <Link
            target="_self"
            className="link bg"
            href={`/sign-in?callbackUrl=${callbackUrl}`}
          >
            ورود
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;

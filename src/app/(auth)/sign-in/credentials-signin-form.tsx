"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInDefaultValues } from "@/lib/constants";
import Link from "next/link";

const CredentialsSignInForm = () => {
  return (
    <form>
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">آدرس ایمیل</Label>
          <Input
            id="email"
            name="email"
            required
            type="email"
            defaultValue={signInDefaultValues.email}
            autoComplete="email"
          />
        </div>
        <div>
          <Label htmlFor="password">رمز عبور</Label>
          <Input
            id="password"
            name="password"
            required
            type="password"
            defaultValue={signInDefaultValues.password}
            autoComplete="current-password"
          />
        </div>
        <div>
          <Button className="w-full" variant="default">
            ورود
          </Button>
        </div>

        <div className="text-sm text-center text-muted-foreground">
          حساب کاربری ندارید؟
          <Link target="_self" className="link" href="/sign-up">
            ثبت نام
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;

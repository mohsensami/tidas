"use client";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { signInDefaultValues } from "../../../lib/constants";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signInWithCredentials } from "../../../lib/actions/user.actions";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    message: "",
    success: false,
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "در حال وارد شدن ..." : "ورود"}
      </Button>
    );
  };
  const notify = () => toast.success('Here is your toast.');
  return (
    <form action={action}>
      <button onClick={notify}>Make me a toast</button>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label className="mb-2" htmlFor="email">
            آدرس ایمیل
          </Label>
          <Input
            id="email"
            name="email"
            required
            type="email"
            defaultValue={signInDefaultValues.email}
            autoComplete="email"
            dir="ltr"
          />
        </div>
        <div>
          <Label className="mb-2" htmlFor="password">
            رمز عبور
          </Label>
          <Input
            id="password"
            name="password"
            required
            type="password"
            defaultValue={signInDefaultValues.password}
            autoComplete="current-password"
            dir="ltr"
          />
        </div>
        <div>
          <SignInButton />
          {data && !data.success && (
            <div className="text-center text-destructive">{data.message}</div>
          )}
        </div>

        <div className="text-sm text-center text-muted-foreground">
          حساب کاربری ندارید؟
          <Link target="_self" className="link mr-2" href="/sign-up">
            ثبت نام
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;

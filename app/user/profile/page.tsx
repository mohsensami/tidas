import { Metadata } from "next";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import ProfileForm from "./profile-form";

export const metadata: Metadata = {
  title: "پروفایل کاربری",
};

export default async function ProfilePage() {
  const session: any = await auth();
  return (
    <SessionProvider session={session}>
      <div className="max-w-md  mx-auto space-y-4">
        <h2 className="h4-bold">پروفایل کاربری</h2>
        <ProfileForm />
      </div>
    </SessionProvider>
  );
}

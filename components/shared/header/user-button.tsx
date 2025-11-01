import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/user.actions";

const UserButton = async () => {
  const session: any = await auth();
  if (!session) {
    return (
      <Link href="/api/auth/signin">
        <Button className="bg-gold text-dark-blue">ورود</Button>
      </Link>
    );
  }
  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? "";
  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-300"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem>
            <Link className="w-full" href="/user/profile">
              پروفایل کاربری
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="w-full" href="/favorites">
              لیست علاقه مندی ها
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="w-full" href="/user/orders">
              تاریخچه سفارشات
            </Link>
          </DropdownMenuItem>
          {session.user.role === "admin" && (
            <DropdownMenuItem>
              <Link className="w-full" href="/admin/overview">
                مدیر
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className="p-0 mb-1">
            <form action={signOutUser} className="w-full">
              <Button
                className="w-full py-4 px-2 h-4 justify-start"
                variant="ghost"
              >
                خروج
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;

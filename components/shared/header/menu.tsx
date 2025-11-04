import {
  EllipsisVertical,
  ShoppingCart,
  UserIcon,
  MenuIcon,
} from "lucide-react";
import { Button } from "../../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";
import Link from "next/link";
import ModeToggle from "./mode-toggle";
import UserButton from "./user-button";

const Menu = () => {
  return (
    <>
      <div className="flex justify-end gap-3">
        <nav className="md:flex hidden w-full max-w-xs gap-1">
          {/* <ModeToggle /> */}
          <Button asChild variant="ghost">
            <Link href="/cart">
              <ShoppingCart strokeWidth={3} />
              {/* سبد خرید */}
            </Link>
          </Button>
          <UserButton />
        </nav>
        <nav dir="rtl" className="md:hidden">
          <Sheet>
            <SheetTrigger className="align-middle mr-4">
              <MenuIcon className="cursor-pointer" />
            </SheetTrigger>
            <SheetContent className="flex flex-col items-start">
              <SheetTitle className="mr-8 mt-4">منو</SheetTitle>
              {/* <ModeToggle />
              <Button asChild variant="ghost">
                <Link href="/cart">
                  <ShoppingCart />
                  سبد خرید
                </Link>
              </Button>
              <UserButton /> */}

              <div className="mt-8 ">
                <nav className="flex flex-col gap-2 ">
                  <Link
                    className="bg-gray-200 w-100 px-4 py-4 text-sm "
                    href="/"
                  >
                    صفحه نخست
                  </Link>
                  <Link
                    className="bg-gray-200 w-100 px-4 py-4 text-sm "
                    href="/search"
                  >
                    {" "}
                    محصولات
                  </Link>
                  <Link
                    className="bg-gray-200 w-100 px-4 py-4 text-sm "
                    href="/about-us"
                  >
                    {" "}
                    درباره ما
                  </Link>
                  <Link
                    className="bg-gray-200 w-100 px-4 py-4 text-sm "
                    href="/contact-us"
                  >
                    {" "}
                    تماس با ما
                  </Link>
                  <Link
                    className="bg-gray-200 w-100 px-4 py-4 text-sm "
                    href="/faq"
                  >
                    {" "}
                    سوالات متداول
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </>
  );
};

export default Menu;

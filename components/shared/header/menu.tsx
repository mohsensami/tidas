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
import CartTrigger from "./CartTrigger";

const Menu = () => {
  return (
    <>
      <div className="flex justify-end gap-3 ">
        <nav className="md:flex hidden w-full max-w-xs gap-1">
          <ModeToggle />
          {/* <Button asChild variant="ghost">
            <Link href="/cart">
              <ShoppingCart strokeWidth={3} />
            </Link>
          </Button> */}
          <UserButton />
        </nav>
        <CartTrigger />
        <nav dir="rtl" className="md:hidden ">
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

              <div className="">
                <nav className="flex flex-col items-center gap-2 w-full overflow-hidden">
                  <li className="bg-gray-200 w-64 text-center px-4 py-4 text-sm ">
                    <Link href="/">صفحه نخست</Link>
                  </li>
                  <li className="bg-gray-200 w-64 text-center px-4 py-4 text-sm ">
                    <Link href="/search"> محصولات</Link>
                  </li>
                  <li className="bg-gray-200 w-64 text-center px-4 py-4 text-sm ">
                    <Link href="/about-us"> درباره ما</Link>
                  </li>
                  <li className="bg-gray-200 w-64 text-center px-4 py-4 text-sm ">
                    <Link href="/contact-us"> تماس با ما</Link>
                  </li>
                  <li className="bg-gray-200 w-64 text-center px-4 py-4 text-sm ">
                    <Link href="/faq"> سوالات متداول</Link>
                  </li>
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

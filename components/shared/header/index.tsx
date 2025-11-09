import { ShoppingCart, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../../ui/button";
import { APP_NAME } from "../../../lib/constants";
import ModeToggle from "./mode-toggle";
import Menu from "./menu";
import CategoriesDrawer from "./categories-drawer";
import Search from "./search";
import { MenuLinks } from "./MenuLinks";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-dark-blue text-gold text-tidas backdrop-blur border-b border-b-gold">
      <div className="wrapper flex flex-between">
        <div className="flex-start ">
          <Link href="/" className="flex-start">
            {/* <Image
              priority={true}
              src="/images/logo.jpg"
              width={48}
              height={48}
              alt={`${APP_NAME} logo`}
            />
            <span className="hidden lg:block font-bold text-2xl mr-3">
              {APP_NAME}
            </span> */}
          </Link>
          <MenuLinks />
          {/*<nav className="md:flex hidden w-full text-xs gap-4">
            <Link href="/">صفحه نخست</Link>
            <Link href="/search"> محصولات</Link>
            <Link href="/about-us"> درباره ما</Link>
            <Link href="/contact-us"> تماس با ما</Link>
            <Link href="/faq"> سوالات متداول</Link>
          </nav>*/}
        </div>
        <div className="">
          <Search />
        </div>
        <div className="flex justify-center">
          {/* <CategoriesDrawer /> */}
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;

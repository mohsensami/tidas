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
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="wrapper flex flex-between items-center py-4">
        {/* Logo */}
        <div className="flex-start">
          <Link href="/" className="flex items-center gap-3">
            <Image
              priority={true}
              src="/images/logo.jpg"
              width={60}
              height={60}
              alt={`${APP_NAME} logo`}
              className="rounded"
            />
            <span className="hidden lg:block font-bold text-xl text-gray-800">
              {APP_NAME}
            </span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="hidden lg:flex flex-1 justify-center">
          <MenuLinks />
        </div>

        {/* Right Side - Cart, User, Menu */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            {/* <Link
              href="/contact-us"
              className="text-sm text-gray-700 hover:text-yellow-600"
            >
              021-xxxxxx
            </Link> */}
          </div>
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;

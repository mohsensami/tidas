"use client";

import React from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

// Dummy data for menu items
const navItems = [
  { name: "خانه", href: "/" },
  {
    name: "محصولات",
    href: "/products",
    dropdown: [
      { name: "گردنبند", href: "/products/necklaces" },
      { name: "انگشتر", href: "/products/rings" },
      { name: "گوشواره", href: "/products/earrings" },
      { name: "دستبند", href: "/products/bracelets" },
    ],
  },
  { name: "درباره ما", href: "/about" },
  { name: "تماس با ما", href: "/contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-yellow-600 md:text-2xl"
        >
          Tidas Gold Gallery
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {navItems.map((item) => (
            <React.Fragment key={item.name}>
              {item.dropdown ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1">
                      {item.name}
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link href={subItem.href}>{subItem.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Auth Button */}
        <div className="hidden md:block">
          <Button>ورود / ثبت‌نام</Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle mobile menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-4 p-4">
                {navItems.map((item) => (
                  <React.Fragment key={item.name}>
                    {item.dropdown ? (
                      <div className="flex flex-col gap-2">
                        <span className="font-semibold">{item.name}</span>
                        <div className="flex flex-col gap-1 pr-4">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="font-semibold hover:text-foreground"
                      >
                        {item.name}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
                <div className="mt-4">
                  <Button className="w-full">ورود / ثبت‌نام</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

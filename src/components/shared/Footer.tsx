import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white  m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image
              width={150}
              height={150}
              className="h-8"
              alt="tidas"
              src="https://flowbite.com/docs/images/logo.svg"
            />
            <span className="self-center text-xl mr-2 font-semibold whitespace-nowrap dark:text-white">
              تادیس
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                قوانین و مقررات
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                سوالات متداول
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                شرایط خرید
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                خرید حضوری
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          {/* <a href="https://flowbite.com/" className="hover:underline">
            تادیس گلد گالری
            </a> */}
          کليه حقوق محصولات و محتوای اين سایت متعلق به تادیس گلد گالری است. ©
          {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}

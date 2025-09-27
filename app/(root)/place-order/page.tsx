import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { auth } from "@/auth";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { formatCurrency } from "@/lib/utils";
import { ShippingAddress } from "@/types";
import PlaceOrderForm from "./place-order-form";

export const metadata = {
  title: "ثبت سفارش",
};

const placeOrderPage = async () => {
  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User ID not found");
  }

  const user = await getUserById(userId);

  if (!cart || cart.items.length === 0) redirect("/cart");
  if (!user.address) redirect("/shipping-address");
  if (!user.paymentMethod) redirect("/payment-method");

  const userAddress = user.address as ShippingAddress;

  return (
    <div className="wrapper my-8">
      <CheckoutSteps current={3} />
      <h1 className="py-4 text-2xl">ثبت سفارش</h1>

      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="overflow-x-auto md:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">آدرس حمل و نقل</h2>
              <p>{userAddress.fullName}</p>
              <p>
                {userAddress.streetAddress}, {userAddress.city},{" "}
                {userAddress.postalCode}, {userAddress.country}{" "}
              </p>
              <div className="mt-3">
                <Link href="/shipping-address">
                  <Button variant="outline">ویرایش</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">روش پرداخت</h2>
              <p>{user.paymentMethod}</p>
              <div className="mt-3">
                <Link href="/payment-method">
                  <Button variant="outline">ویرایش</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">سفارش اقلام</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اقلام</TableHead>
                    <TableHead>تعداد</TableHead>
                    <TableHead>قیمت</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.items.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="px-2">{item.qty}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Link href="/cart">
                <Button variant="outline">ویرایش</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="p-4 gap-4 space-y-4">
              <div className="flex justify-between">
                <div>اقلام</div>
                <div>{formatCurrency(cart.itemsPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>مالیات</div>
                <div>{formatCurrency(cart.taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>حمل و نقل</div>
                <div>{formatCurrency(cart.shippingPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>جمع</div>
                <div>{formatCurrency(cart.totalPrice)}</div>
              </div>
              {/* Form Here */}
              <PlaceOrderForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default placeOrderPage;

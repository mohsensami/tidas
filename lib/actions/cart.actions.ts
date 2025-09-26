"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { auth } from "@/auth";
import { formatError, round2 } from "../utils";
// import { cartItemSchema, insertCartSchema } from "../validator";
import { CartItem } from "@/types";
import { convertToPlainObject } from "../utils";
import { cartItemSchema, insertCartSchema } from "../validators";
import { prisma } from "@/db/prisma";
import { Prisma } from "../generated/prisma";

// محاسبه قیمت سبد خرید بر اساس آیتم‌ها
const calcPrice = (items: z.infer<typeof cartItemSchema>[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 10),
    taxPrice = round2(0.15 * itemsPrice),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

// افزودن آیتم به سبد خرید در پایگاه داده
export const addItemToCart = async (data: z.infer<typeof cartItemSchema>) => {
  try {
    // بررسی کوکی سبد خرید سشن
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("سبد خرید سشن یافت نشد");
    // گرفتن سشن و آیدی کاربر
    const session: any = await auth();
    const userId = session?.user.id as string | undefined;
    // گرفتن سبد خرید از پایگاه داده
    const cart = await getMyCart();
    // اعتبارسنجی داده آیتم ارسال شده
    const item = cartItemSchema.parse(data);
    // یافتن محصول در پایگاه داده
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    if (!product) throw new Error("محصول یافت نشد");

    if (!cart) {
      // ایجاد سبد خرید جدید
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });
      // افزودن به پایگاه داده
      await prisma.cart.create({
        data: newCart,
      });

      // بازاعتبارسنجی صفحه محصول
      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: "آیتم با موفقیت به سبد خرید اضافه شد",
      };
    } else {
      // بررسی آیتم موجود در سبد
      const existItem = (cart.items as CartItem[]).find(
        (x) => x.productId === item.productId
      );
      // اگر موجودی کافی نباشد، خطا بده
      if (existItem) {
        if (product.stock < existItem.qty + 1) {
          throw new Error("موجودی کافی نیست");
        }

        // افزایش تعداد آیتم موجود
        (cart.items as CartItem[]).find(
          (x) => x.productId === item.productId
        )!.qty = existItem.qty + 1;
      } else {
        // اگر موجودی داشت، آیتم را اضافه کن
        if (product.stock < 1) throw new Error("موجودی کافی نیست");
        cart.items.push(item);
      }

      // ذخیره در پایگاه داده
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrice(cart.items as CartItem[]),
        },
      });

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name} با موفقیت ${
          existItem ? "در" : "به"
        } سبد خرید ${existItem ? "بروزرسانی شد" : "اضافه شد"}`,
      };
    }

    // تست
    console.log({
      "آی‌دی سبد خرید سشن": sessionCartId,
      "آی‌دی کاربر": userId,
      "آیتم درخواست شده": item,
      "محصول یافت شده": product,
      cart: cart,
    });

    return {
      success: true,
      message: "تست سبد خرید",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

// گرفتن سبد خرید کاربر از پایگاه داده
export async function getMyCart() {
  // بررسی کوکی سبد خرید سشن
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) return undefined;

  // گرفتن سشن و آیدی کاربر
  const session = await auth();
  const userId = session?.user?.id ? (session?.user.id as string) : undefined;

  // گرفتن سبد خرید کاربر از پایگاه داده
  const cart = await prisma?.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  // تبدیل مقادیر Decimal به رشته برای سازگاری با کامپوننت AddToCart
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}

// حذف آیتم از سبد خرید در پایگاه داده
export async function removeItemFromCart(productId: string) {
  try {
    // گرفتن آی‌دی سبد خرید سشن
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("سبد خرید سشن یافت نشد");

    // گرفتن محصول
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("محصول یافت نشد");

    // گرفتن سبد خرید کاربر
    const cart = await getMyCart();
    if (!cart) throw new Error("سبد خرید یافت نشد");

    // بررسی وجود آیتم در سبد
    const exist = (cart.items as CartItem[]).find(
      (x) => x.productId === productId
    );
    if (!exist) throw new Error("آیتم یافت نشد");

    // بررسی تک‌آیتمی بودن سبد
    if (exist.qty === 1) {
      // حذف آیتم از سبد
      cart.items = (cart.items as CartItem[]).filter(
        (x) => x.productId !== exist.productId
      );
    } else {
      // کاهش تعداد آیتم موجود
      (cart.items as CartItem[]).find((x) => x.productId === productId)!.qty =
        exist.qty - 1;
    }

    // بروزرسانی سبد در پایگاه داده
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items as CartItem[]),
      },
    });

    // بازاعتبارسنجی صفحه محصول
    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} با موفقیت ${
        (cart.items as CartItem[]).find((x) => x.productId === productId)
          ? "در سبد خرید بروزرسانی شد"
          : "از سبد خرید حذف شد"
      }`,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

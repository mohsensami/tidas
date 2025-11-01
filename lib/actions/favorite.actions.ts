"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { formatError } from "../utils";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";

// افزودن محصول به علاقه‌مندی‌ها
export async function addToFavorites(productId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "لطفا ابتدا وارد حساب کاربری خود شوید",
      };
    }

    const userId = session.user.id as string;

    // بررسی وجود محصول
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (!product) {
      return {
        success: false,
        message: "محصول یافت نشد",
      };
    }

    // بررسی اینکه آیا قبلا به علاقه‌مندی‌ها اضافه شده است
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (existingFavorite) {
      return {
        success: false,
        message: "این محصول قبلا به علاقه‌مندی‌ها اضافه شده است",
      };
    }

    // افزودن به علاقه‌مندی‌ها
    await prisma.favorite.create({
      data: {
        userId,
        productId,
      },
    });

    revalidatePath(`/product/${product.slug}`);
    revalidatePath("/favorites");

    return {
      success: true,
      message: "محصول به علاقه‌مندی‌ها اضافه شد",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// حذف محصول از علاقه‌مندی‌ها
export async function removeFromFavorites(productId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "لطفا ابتدا وارد حساب کاربری خود شوید",
      };
    }

    const userId = session.user.id as string;

    // بررسی وجود محصول
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (!product) {
      return {
        success: false,
        message: "محصول یافت نشد",
      };
    }

    // بررسی اینکه آیا در علاقه‌مندی‌ها وجود دارد
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (!existingFavorite) {
      return {
        success: false,
        message: "این محصول در علاقه‌مندی‌ها وجود ندارد",
      };
    }

    // حذف از علاقه‌مندی‌ها
    await prisma.favorite.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    revalidatePath(`/product/${product.slug}`);
    revalidatePath("/favorites");

    return {
      success: true,
      message: "محصول از علاقه‌مندی‌ها حذف شد",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// تابع toggle برای افزودن یا حذف از علاقه‌مندی‌ها
export async function toggleFavorite(productId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "لطفا ابتدا وارد حساب کاربری خود شوید",
      };
    }

    const userId = session.user.id as string;

    // بررسی وجود محصول
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (!product) {
      return {
        success: false,
        message: "محصول یافت نشد",
      };
    }

    // بررسی اینکه آیا قبلا به علاقه‌مندی‌ها اضافه شده است
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (existingFavorite) {
      // حذف از علاقه‌مندی‌ها
      await prisma.favorite.delete({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });

      revalidatePath(`/product/${product.slug}`);
      revalidatePath("/favorites");

      return {
        success: true,
        message: "محصول از علاقه‌مندی‌ها حذف شد",
        isFavorite: false,
      };
    } else {
      // افزودن به علاقه‌مندی‌ها
      await prisma.favorite.create({
        data: {
          userId,
          productId,
        },
      });

      revalidatePath(`/product/${product.slug}`);
      revalidatePath("/favorites");

      return {
        success: true,
        message: "محصول به علاقه‌مندی‌ها اضافه شد",
        isFavorite: true,
      };
    }
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// بررسی اینکه آیا محصول در علاقه‌مندی‌های کاربر است یا نه
export async function isProductFavorite(productId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return false;
    }

    const userId = session.user.id as string;

    const favorite = await prisma.favorite.findFirst({
      where: {
        userId,
        productId,
      },
    });

    return !!favorite;
  } catch (error) {
    return false;
  }
}

// دریافت تمام علاقه‌مندی‌های کاربر
export async function getMyFavorites() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return [];
    }

    const userId = session.user.id as string;

    const favorites = await prisma.favorite.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return convertToPlainObject(favorites.map((favorite) => favorite.product));
  } catch (error) {
    return [];
  }
}

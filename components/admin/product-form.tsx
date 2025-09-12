"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { productDefaultValues } from "@/lib/constants";
import { ControllerRenderProps } from "react-hook-form";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: "Create" | "Update";
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof insertProductSchema>>({
    // resolver:
    //   type === "Update"
    //     ? zodResolver(updateProductSchema)
    //     : zodResolver(insertProductSchema),
    defaultValues:
      product && type === "Update" ? product : productDefaultValues,
  });

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Name */}
          {/* Slug */}
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Category */}
          {/* Brand */}
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Price */}
          {/* Stock  */}
        </div>
        <div className="upload-field flex flex-col gap-5 md:flex-row">
          {/* Images */}
        </div>
        <div className="upload-field">{/* Is Featured */}</div>
        <div>{/* Description */}</div>
        <div>{/* Submit */}</div>
      </form>
    </Form>
  );
};

export default ProductForm;

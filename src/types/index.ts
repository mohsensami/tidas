import { insertProductSchema } from "@/lib/validator";
import z from "zod";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: Date;
  rating: string;
  numReviews: number;
};

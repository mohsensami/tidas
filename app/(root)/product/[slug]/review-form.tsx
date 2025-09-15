"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
// import {
//   createUpdateReview,
//   getReviewByProductId,
// } from "@/lib/actions/review.actions";
import { insertReviewSchema } from "@/lib/validators";
import { z } from "zod";
import { StarIcon } from "lucide-react";
import { reviewFormDefaultValues } from "@/lib/constants";
import {
  createUpdateReview,
  getReviewByProductId,
} from "@/lib/actions/review.actions";
import toast from "react-hot-toast";

type CustomerReview = z.infer<typeof insertReviewSchema>;

const ReviewForm = ({
  userId,
  productId,
  onReviewSubmitted,
}: {
  userId: string;
  productId: string;
  onReviewSubmitted: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm<any>({
    resolver: zodResolver(insertReviewSchema),
    defaultValues: reviewFormDefaultValues,
  });

  // Form submit handler
  const onSubmit: SubmitHandler<CustomerReview> = async (values) => {
    const res = await createUpdateReview({ ...values, productId });

    if (!res.success)
      // return toast({
      //   variant: "destructive",
      //   description: res.message,
      // });
      toast.error(res.message);

    setOpen(false);

    onReviewSubmitted();

    // toast({
    //   description: res.message,
    // });
    toast.success(res.message);
  };

  // Open dialog on button click
  const handleOpenForm = async () => {
    form.setValue("productId", productId);
    form.setValue("userId", userId);

    const review = await getReviewByProductId({ productId });

    if (review) {
      form.setValue("title", review.title);
      form.setValue("description", review.description);
      form.setValue("rating", review.rating);
    }
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={handleOpenForm} variant="default">
        یک دیدگاه بنویسید
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="text-right">
                یک دیدگاه بنویسید
              </DialogTitle>
              <DialogDescription className="text-right">
                دیدگاه خود را با دیگر مشتریان به اشتراک بگذارید
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="عنوان دیدگاه خود را وارد کنید"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>متن</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="متن دیدگاه خود را وارد کنید"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>امتیاز</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                      dir="rtl"
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="یک امتیاز وارد کنید" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <SelectItem
                            key={index}
                            value={(index + 1).toString()}
                          >
                            {index + 1} <StarIcon className="inline h-4 w-4" />
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "در حال ارسال ..." : "ارسال"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;

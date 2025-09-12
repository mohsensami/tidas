"use client";

import { useState, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

export default function DeleteDialog({
  id,
  action,
}: {
  id: string;
  action: (id: string) => Promise<{ success: boolean; message: string }>;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Handle delete order button click
  const handleDeleteClick = () => {
    startTransition(async () => {
      const res = await action(id);
      if (!res.success) {
        toast.error(res.message);
      } else {
        setOpen(false);
        toast.success(res.message);
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="outline">
          حذف
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>کاملاً مطمئنی؟</AlertDialogTitle>
          <AlertDialogDescription dir="rtl">
            این اقدام قابل لغو نیست.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>انصراف</AlertDialogCancel>
          <Button
            variant="destructive"
            size="sm"
            disabled={isPending}
            onClick={handleDeleteClick}
          >
            {isPending ? "در حال حذف شده" : "حذف"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

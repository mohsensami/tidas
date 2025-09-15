"use client";

import { useEffect, useState } from "react";
import { Review } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Check, User } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import ReviewForm from "./review-form";

const ReviewList = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Reload reviews when a review is submitted
  const reload = async () => {
    console.log("review submitted");
  };

  return (
    <div className="space-y-4">
      {reviews.length === 0 && <div>No reviews yet</div>}
      {userId ? (
        <>
          {/* REVIEW FORM HERE */}
          <ReviewForm
            userId={userId}
            productId={productId}
            onReviewSubmitted={reload}
          />
        </>
      ) : (
        <div>
          Please{" "}
          <Link
            className="text-primary px-2"
            href={`/api/auth/signin?callbackUrl=/product/${productSlug}`}
          >
            sign in
          </Link>{" "}
          to write a review
        </div>
      )}
      <div className="flex flex-col gap-3">{/* REVIEWS HERE */}</div>
    </div>
  );
};

export default ReviewList;

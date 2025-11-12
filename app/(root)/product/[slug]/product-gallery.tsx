"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ZoomIn } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [current, setCurrent] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative group aspect-square overflow-hidden rounded-lg border bg-muted">
          <Image
            src={images[current]}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
            onClick={() => setIsZoomOpen(true)}
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Thumbnail Images */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                className={cn(
                  "relative flex-shrink-0 w-20 h-20 rounded-md border-2 overflow-hidden transition-all",
                  current === index
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : "border-muted hover:border-primary/50"
                )}
              >
                <Image
                  src={image}
                  alt={`${name} - تصویر ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zoom Dialog */}
      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent className="max-w-4xl w-full p-0">
          <div className="relative aspect-square">
            <Image
              src={images[current]}
              alt={name}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-contain"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto border-t">
              {images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrent(index)}
                  className={cn(
                    "relative flex-shrink-0 w-16 h-16 rounded-md border-2 overflow-hidden transition-all",
                    current === index
                      ? "border-primary"
                      : "border-muted hover:border-primary/50"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${name} - تصویر ${index + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductGallery;

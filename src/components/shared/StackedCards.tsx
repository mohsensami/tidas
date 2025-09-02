"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CardsProps {
  items: { img: string; title?: string }[];
}

const StackedCards: React.FC<CardsProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0 for initial, 1 for right, -1 for left

  const CARD_GAP = 20; // Gap between cards in pixels when stacked
  const SCALE_DECREMENT = 0.05; // How much smaller each subsequent card is
  const OPACITY_DECREMENT = 0.2; // How much more transparent each subsequent card is
  const MAX_VISIBLE_STACK = 3; // How many cards to show in the stack behind the main card

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const getCardVariants = (i: number, isCurrent: boolean) => {
    const depth = i - currentIndex; // How far back in the stack the card is

    if (depth < 0) {
      // Cards that have already passed
      return {
        initial: {
          x: direction < 0 ? 0 : -300,
          opacity: 0,
          scale: 0.8,
          rotate: 0,
        },
        animate: { x: -300, opacity: 0, scale: 0.8, rotate: 0, zIndex: 0 },
        exit: {
          x: direction > 0 ? 0 : 300,
          opacity: 0,
          scale: 0.8,
          rotate: 0,
          zIndex: 0,
        },
      };
    }

    // Current card and cards in the stack behind it
    const scale = 1 - depth * SCALE_DECREMENT;
    const opacity = 1 - depth * OPACITY_DECREMENT;
    const zIndex = items.length - depth; // Ensure current card is on top

    return {
      initial: {
        x: direction > 0 ? 300 : direction < 0 ? -300 : 0, // Coming from right/left based on direction
        y: depth * -CARD_GAP,
        scale,
        opacity,
        rotate: 0,
        zIndex,
      },
      animate: {
        x: (depth * CARD_GAP) / 2, // Slight offset for stacked effect
        y: depth * -CARD_GAP,
        scale,
        opacity,
        rotate: depth * 2, // Slight rotation for depth effect
        zIndex,
        transition: {
          type: "spring" as const, // <-- Fix: use 'as const' for type
          stiffness: 300,
          damping: 30,
          mass: 0.5,
        },
      },
      exit: {
        x: direction > 0 ? -300 : 300, // Exiting to left/right based on direction
        opacity: 0,
        scale: 0.8,
        rotate: 0,
        zIndex: 0,
        transition: {
          type: "spring" as const, // <-- Fix: use 'as const' for type
          stiffness: 300,
          damping: 30,
          mass: 0.5,
        },
      },
    };
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Container for stacked cards */}
      <div className="relative w-80 h-[450px] perspective-[1000px]">
        <AnimatePresence initial={false} custom={direction}>
          {items.map((item, i) => {
            // Only render current, and a few cards behind it
            if (i < currentIndex || i > currentIndex + MAX_VISIBLE_STACK) {
              return null;
            }

            const isCurrent = i === currentIndex;
            const variants = getCardVariants(i, isCurrent);

            return (
              <motion.div
                key={item.img + i} // Unique key for each card instance
                className="absolute w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={direction}
                drag={isCurrent ? "x" : false} // Only allow dragging the current card
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (!isCurrent) return; // Only current card can be dragged
                  if (info.offset.x > 100) {
                    handlePrev();
                  } else if (info.offset.x < -100) {
                    handleNext();
                  }
                }}
                style={{
                  transformOrigin: "center center", // For consistent rotation
                  cursor: isCurrent ? "grab" : "default",
                }}
              >
                <Image
                  src={item.img}
                  alt={item.title || `Card ${i}`}
                  fill
                  className="object-cover"
                />
                {item.title && (
                  <div className="absolute bottom-0 w-full bg-black/50 text-white p-3 text-center text-lg font-semibold">
                    {item.title}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex gap-6 mt-4 z-10">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === items.length - 1}
          className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default StackedCards;

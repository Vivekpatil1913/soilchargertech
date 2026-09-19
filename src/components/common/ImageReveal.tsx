"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { imageMask, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

type ImageRevealProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Slow scale-out while the image is on screen. */
  zoomOnHover?: boolean;
  rounded?: string;
};

/**
 * A photograph that uncovers itself from the bottom edge as it enters view.
 * Always fills its parent, so the parent owns the aspect ratio.
 */
export function ImageReveal({
  src,
  alt,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px",
  priority = false,
  zoomOnHover = true,
  rounded = "rounded-xl",
}: ImageRevealProps) {
  return (
    <motion.div
      className={cn("relative overflow-hidden bg-cream-200", rounded, className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={imageMask}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-cover transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-soft)]",
          zoomOnHover && "motion-safe:group-hover:scale-[1.06]",
          imageClassName,
        )}
      />
    </motion.div>
  );
}

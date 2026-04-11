"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** 1×1 transparent GIF — dok čeka intersection, bez učitavanja pravog fajla. */
const LAZY_PLACEHOLDER_SRC =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

interface AnimatedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  /** Dodatne klase na `<Image />` uz `loadWhenVisible` (npr. `object-cover`). */
  imageClassName?: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  loading?: "eager" | "lazy";
  unoptimized?: boolean;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
  /**
   * Placeholder `src` dok `<img>` nije u viewportu (IntersectionObserver na samom elementu).
   * Isti DOM kao bez ovog propa: samo `next/image` → `<img>`, bez dodatnog `div` omotača (hidracija).
   */
  loadWhenVisible?: boolean;
  visibleRootMargin?: string;
}

export default function AnimatedImage({
  src,
  alt,
  width = 400,
  height = 400,
  className = "",
  imageClassName,
  priority = false,
  fetchPriority,
  loading,
  unoptimized = false,
  onClick,
  loadWhenVisible = false,
  visibleRootMargin = "120px 0px",
}: AnimatedImageProps) {
  const [inView, setInView] = useState(() => !loadWhenVisible || priority);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const showRealImage = !loadWhenVisible || priority || inView;
  const displaySrc = showRealImage ? src : LAZY_PLACEHOLDER_SRC;
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const isLoaded = loadedSrc === displaySrc;

  useEffect(() => {
    if (!loadWhenVisible || priority) return;

    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: visibleRootMargin, threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadWhenVisible, priority, visibleRootMargin]);

  const imageOpacity = cn(
    "transition-opacity duration-300",
    isLoaded ? "opacity-100" : "opacity-0",
  );

  if (!loadWhenVisible) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(imageOpacity, className)}
        priority={priority}
        fetchPriority={fetchPriority}
        loading={loading}
        unoptimized={unoptimized}
        onLoad={() => setLoadedSrc(src)}
        onClick={onClick}
      />
    );
  }

  return (
    <Image
      ref={imgRef}
      src={displaySrc}
      alt={showRealImage ? alt : ""}
      width={width}
      height={height}
      className={cn(imageOpacity, className, imageClassName)}
      priority={priority}
      fetchPriority={fetchPriority}
      loading={priority ? undefined : "lazy"}
      unoptimized={unoptimized || !showRealImage}
      onLoad={() => setLoadedSrc(displaySrc)}
      onClick={onClick}
    />
  );
}

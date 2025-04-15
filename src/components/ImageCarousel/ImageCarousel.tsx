"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageCarouselProps {
  images?: Array<string>;
}

export const ImageCarousel = ({ images = [] }: ImageCarouselProps) => {
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);

  const nextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
    setError(false);
  };

  const prevImage = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setError(false);
  };

  useEffect(() => {
    setError(false);
  }, [index]);

  return (
    <div
      className={`
        relative flex h-full w-full min-w-20 items-center justify-center
        overflow-hidden bg-gray-200
        md:min-w-40
      `}
    >
      {!error ? (
        <Image
          onError={() => setError(true)}
          src={images[index]}
          alt={`Image ${index + 1}`}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 350px, 250px"
        />
      ) : (
        <svg className="h-full w-full" aria-hidden="true" role="img">
          <use href="/assets/sprite.svg#no-image" />
        </svg>
      )}

      {images.length > 1 ? (
        <>
          <button
            type="button"
            onClick={prevImage}
            className={`
              font-leOsler bg-primary-1000/50 pointer absolute top-1/2 left-2
              h-8 w-8 -translate-y-1/2 transform rounded-full text-2xl
              text-white
              hover:bg-primary-1000/80 hover:font-bold
            `}
          >
            ←
          </button>

          <button
            type="button"
            onClick={nextImage}
            className={`
              font-leOsler bg-primary-1000/50 pointer absolute top-1/2 right-2
              h-8 w-8 -translate-y-1/2 transform rounded-full text-2xl
              text-white
              hover:bg-primary-1000/80 hover:font-bold
            `}
          >
            →
          </button>
        </>
      ) : null}
    </div>
  );
};

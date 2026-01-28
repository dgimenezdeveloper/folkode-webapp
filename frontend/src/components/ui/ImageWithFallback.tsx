'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string
}

export default function ImageWithFallback({
  src,
  fallbackSrc = '/images/placeholder.svg',
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  return (
    <Image
      {...props}
      src={hasError ? fallbackSrc : imgSrc}
      alt={alt}
      onError={() => {
        if (!hasError) {
          setHasError(true)
          setImgSrc(fallbackSrc)
        }
      }}
      unoptimized={hasError}
    />
  )
}

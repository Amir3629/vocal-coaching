"use client"

import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { getImagePath } from '../../lib/utils'

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string
  fallbackSrc?: string
}

export default function ImageWithFallback({
  src,
  fallbackSrc = '/images/fallback-image.jpg',
  alt,
  ...rest
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(getImagePath(src))
  const [error, setError] = useState(false)

  const handleError = () => {
    if (!error) {
      setImgSrc(getImagePath(fallbackSrc))
      setError(true)
    }
  }

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt || 'Image'}
      onError={handleError}
    />
  )
} 
import { useState } from 'react'

interface Props {
  url: string | null
  size: number
  rounded?: string
  className?: string
}

export function ArtworkImage({ url, size, rounded = 'rounded-xl', className = '' }: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={`relative flex-shrink-0 overflow-hidden bg-white/20 ${rounded} ${className}`}
      style={{ width: size, height: size }}
    >
      {(!loaded || !url) && (
        <div className={`absolute inset-0 bg-white/20 animate-pulse ${rounded}`} />
      )}
      {url && (
        <img
          src={url}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  )
}

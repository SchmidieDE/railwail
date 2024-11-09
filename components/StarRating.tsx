import { FaStar } from 'react-icons/fa'
import { useState } from 'react'

interface StarRatingProps {
  rating: number
  readonly?: boolean
}

export default function StarRating({ rating, readonly = true }: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null)

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = hover ?? rating >= star

        return (
          <FaStar
            key={star}
            className={`text-2xl ${
              filled ? 'text-yellow-400' : 'text-gray-300'
            } transition-colors duration-200 hover:scale-110`}
            size={24}
            onMouseEnter={() => !readonly && setHover(star)}
            onMouseLeave={() => !readonly && setHover(null)}
          />
        )
      })}
      <span className="ml-2 text-sm text-gray-600">
        ({rating.toFixed(1)})
      </span>
    </div>
  )
} 
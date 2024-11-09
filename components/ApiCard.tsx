import StarRating from './StarRating'

interface ApiCardProps {
  name: string
  description: string
  rating: number
}

export default function ApiCard({ name, description, rating }: ApiCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="mt-2">
        <StarRating rating={rating} />
      </div>
    </div>
  )
} 
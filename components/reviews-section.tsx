'use client'

import { Star, ThumbsUp } from 'lucide-react'
import { useState } from 'react'

const reviews = [
  {
    id: 1,
    author: 'Priya Sharma',
    rating: 5,
    date: '2 weeks ago',
    title: 'Absolutely Perfect!',
    content: 'This solitaire ring is everything I dreamed of. The quality is exceptional and it arrived beautifully packaged. The customer service team was incredibly helpful throughout the process.',
    helpful: 24
  },
  {
    id: 2,
    author: 'Rajesh Gupta',
    rating: 5,
    date: '1 month ago',
    title: 'Exceeded Expectations',
    content: 'I bought this as an engagement ring and my fiancée loved it! The diamond is brilliant and the setting is sturdy. Worth every penny.',
    helpful: 18
  },
  {
    id: 3,
    author: 'Meera Patel',
    rating: 4,
    date: '1 month ago',
    title: 'Beautiful Ring',
    content: 'The ring arrived on time and in perfect condition. The only reason I\'m giving 4 stars instead of 5 is the sizing took a bit longer than expected.',
    helpful: 12
  },
  {
    id: 4,
    author: 'Arjun Singh',
    rating: 5,
    date: '2 months ago',
    title: 'Best Purchase Ever',
    content: 'Certified, authentic, and absolutely stunning. The transparency about the diamond specifications was impressive. Highly recommend!',
    helpful: 32
  }
]

export default function ReviewsSection({ productId }: { productId: string }) {
  const [helpfulReviews, setHelpfulReviews] = useState<Set<number>>(new Set())

  const toggleHelpful = (id: number) => {
    setHelpfulReviews(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <div className="border-t border-border pt-12">
      <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Rating Summary */}
        <div className="bg-muted/50 rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">{averageRating}</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(parseFloat(averageRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Based on {reviews.length} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2 pt-4">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = reviews.filter(r => r.rating === rating).length
              const percentage = (count / reviews.length) * 100
              return (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-8">{rating}★</span>
                  <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">{count}</span>
                </div>
              )
            })}
          </div>

          <button className="w-full mt-6 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition">
            Write a Review
          </button>
        </div>

        {/* Reviews List */}
        <div className="md:col-span-2 space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="border border-border rounded-lg p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-foreground">{review.author}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
                <p className="text-foreground text-sm leading-relaxed">{review.content}</p>
              </div>

              {/* Helpful Button */}
              <button
                onClick={() => toggleHelpful(review.id)}
                className={`flex items-center gap-2 text-sm transition ${
                  helpfulReviews.has(review.id)
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                Helpful ({review.helpful + (helpfulReviews.has(review.id) ? 1 : 0)})
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

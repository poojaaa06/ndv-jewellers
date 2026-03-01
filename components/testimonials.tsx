'use client'


import { Star, ThumbsUp } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Bride',
    content: 'My engagement ring is absolutely stunning! The quality exceeded my expectations, and the customer service was exceptional from start to finish.',
    rating: 5,
    avatar: 'PS',
    time: '2 weeks ago',
    likes: 24,
  },
  {
    name: 'Rajesh Gupta',
    role: 'Groom',
    content: 'The wedding band is perfect. The craftsmanship is exceptional, and the lab-grown diamond is brilliant and ethically sourced. Highly recommended!',
    rating: 5,
    avatar: 'RG',
    time: '1 month ago',
    likes: 18,
  },
  {
    name: 'Meera Patel',
    role: 'Customer',
    content: 'I love my custom pendant! The team listened to every detail and brought my vision to life beautifully. Worth every penny.',
    rating: 5,
    avatar: 'MP',
    time: '3 weeks ago',
    likes: 31,
  },
  {
    name: 'Arjun Singh',
    role: 'Customer',
    content: 'Excellent quality, fair pricing, and secure delivery. The certification process is transparent and trustworthy. Best jewelry purchase I\'ve made!',
    rating: 5,
    avatar: 'AS',
    time: '5 days ago',
    likes: 42,
  },
  {
    name: 'Ananya Desai',
    role: 'Customer',
    content: 'Their attention to detail is remarkable. The custom design process was smooth and the final piece exceeded all expectations!',
    rating: 5,
    avatar: 'AD',
    time: '2 weeks ago',
    likes: 27,
  },
  {
    name: 'Vikram Mehta',
    role: 'Customer',
    content: 'Outstanding service from consultation to delivery. The 3D preview helped us visualize the piece perfectly. Will definitely return!',
    rating: 5,
    avatar: 'VM',
    time: '1 week ago',
    likes: 35,
  },
  {
    name: 'Neha Kapoor',
    role: 'Bride',
    content: 'The perfect wedding jewelry set! Every piece is crafted with precision and care. The team went above and beyond to accommodate our timeline.',
    rating: 5,
    avatar: 'NK',
    time: '3 weeks ago',
    likes: 29,
  },
  {
    name: 'Rohan Malhotra',
    role: 'Customer',
    content: 'Best jewelry experience in Mumbai! Transparent pricing, certified diamonds, and the quality speaks for itself. 5/5 stars!',
    rating: 5,
    avatar: 'RM',
    time: '2 months ago',
    likes: 53,
  }
]

export default function Testimonials() {
  const averageRating = 5.0
  const totalReviews = 248

  return (
    <section className="py-8 md:py-20 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-0 w-72 h-72 bg-[#60182d]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-0 w-72 h-72 bg-[#60182d]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Google-style stats */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-[#60182d]/5 px-4 py-2 rounded-full border border-[#60182d]/10 mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-[#60182d] text-sm font-medium">Google Reviews</span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#60182d] mb-3">
            What Our Customers Say
          </h2>
          
          {/* Rating summary */}
          {/* <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-[#1a1a1a]">{averageRating}</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#60182d] text-[#60182d]" />
                ))}
              </div>
            </div>
            <div className="h-6 w-px bg-[#60182d]/20"></div>
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm text-gray-600">Based on <span className="font-semibold text-[#1a1a1a]">{totalReviews}</span> reviews</span>
            </div>
          </div> */}
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Gradient fade on right */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10 md:hidden"></div>
          
          {/* Scrollable Container */}
          <div className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-4 min-w-max">
              {testimonials.map((testimonial, i) => (
                <div 
                  key={i} 
                  className="w-[280px] sm:w-[300px] bg-white rounded-xl p-5 border border-[#60182d]/10 hover:border-[#60182d]/30 hover:shadow-lg transition-all duration-300 space-y-4 group"
                >
                  {/* Header with Google icon and rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span className="text-xs text-gray-500">{testimonial.time}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: testimonial.rating }).map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-[#60182d] text-[#60182d]" />
                      ))}
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="min-h-[100px]">
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                      "{testimonial.content}"
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#60182d]/10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#60182d]/10 text-[#60182d] flex items-center justify-center font-semibold text-xs">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-[#1a1a1a]">{testimonial.name}</p>
                        <p className="text-xs text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    {/* Like button */}
                    <div className="flex items-center gap-1 text-gray-400">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span className="text-xs">{testimonial.likes}</span>
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-12 h-0.5 bg-[#60182d] rounded-full transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View all button */}
        <div className="text-center mt-8">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#60182d]/30 text-[#60182d] rounded-lg hover:bg-[#60182d]/5 transition-all text-sm font-medium"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            View all {totalReviews} Google reviews
          </a>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
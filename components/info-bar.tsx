'use client'

import { useState } from 'react'
import { X, Sparkles, Truck, ShieldCheck, Gem, Heart } from 'lucide-react'

export default function InfoBar() {
  const [isVisible, setIsVisible] = useState(true)
  
  const messages = [
    { text: '50% OFF Valentine Special', icon: Heart, code: 'LOVE50' },
    { text: 'Free Shipping on Orders Above ₹10,000', icon: Truck },
    { text: '30-Day Money Back Guarantee', icon: ShieldCheck },
    { text: 'Custom Design Consultation Available', icon: Gem },
  ]

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-b border-primary/20 w-full overflow-hidden p-1">
      <div className="flex items-center w-full">
        {/* Full Width Marquee */}
        <div className="flex-1 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {/* Triple the messages for truly seamless loop */}
            {[...messages, ...messages, ...messages, ...messages].map((msg, index) => {
              const Icon = msg.icon
              return (
                <div
                  key={index}
                  className="inline-flex items-center gap-3 mx-6 text-sm font-medium"
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{msg.text}</span>
                  {msg.code && (
                    <span className="bg-primary-foreground/20 px-2 py-0.5 rounded-full text-xs">
                      {msg.code}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Close Button */}
     
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
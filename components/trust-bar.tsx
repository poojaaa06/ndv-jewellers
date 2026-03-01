"use client"
import { useState } from "react"

const items = [
  {
    label: "Certified Lab Grown Diamonds",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L5 10.5L14 25L23 10.5L14 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M5 10.5H23M14 3L9 10.5L14 25M14 3L19 10.5L14 25" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "7 Day Delivery",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="8" width="16" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M19 11.5L24 13.5V21H19V11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="8" cy="22" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="20" cy="22" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Free Home Trial",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L5 11V23H11V17H17V23H23V11L14 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M11 13H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "IGI Certified",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L16.5 9H23L17.5 13L19.5 19.5L14 16L8.5 19.5L10.5 13L5 9H11.5L14 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Mumbai Based",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 4C9.582 4 6 7.582 6 12C6 18 14 25 14 25C14 25 22 18 22 12C22 7.582 18.418 4 14 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Lifetime Warranty",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L5 8V14C5 20 14 25 14 25C14 25 23 20 23 14V8L14 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 13L13 16L18 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function TrustBar() {
const [hovered, setHovered] = useState<number | null>(null)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@400;500&display=swap');

        .trust-bar-root {
          background: white;
          padding: 24px 16px;
          font-family: 'Jost', sans-serif;
          width: 100%;
          overflow: hidden;
          border-top: 1px solid #f0e9e0;
          border-bottom: 1px solid #f0e9e0;
        }

        .trust-bar-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .trust-bar-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #60182d;
          display: inline-block;
          position: relative;
          padding: 0 20px;
        }

        .trust-bar-title::before,
        .trust-bar-title::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 40px;
          height: 1px;
          background: linear-gradient(to right, transparent, #d4c9bc);
        }

        .trust-bar-title::before {
          left: -30px;
        }

        .trust-bar-title::after {
          right: -30px;
          background: linear-gradient(to left, transparent, #d4c9bc);
        }

        /* Desktop view - centered grid */
        .trust-items-desktop {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Mobile view - horizontal scroll */
        .trust-items-mobile {
          display: flex;
          align-items: center;
          gap: 16px;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 4px 4px 8px 4px;
          margin: 0 -4px;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-snap-type: x mandatory;
        }

        .trust-items-mobile::-webkit-scrollbar {
          display: none;
        }

        .trust-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 8px;
          cursor: default;
          transition: all 0.2s ease;
          min-width: 80px;
          scroll-snap-align: start;
        }

        .trust-item.hovered {
          transform: translateY(-2px);
        }

        .trust-item-icon {
          width: 64px;
          height: 64px;
          background: #faf5f0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #60182d;
          transition: all 0.2s ease;
          border: 1px solid #eae2d7;
        }

        .trust-item.hovered .trust-item-icon {
          background: #60182d;
          color: #ffffff;
          border-color: #60182d;
          box-shadow: 0 4px 8px rgba(96, 24, 45, 0.15);
        }

        .trust-item-icon svg {
          width: 32px;
          height: 32px;
        }

        .trust-item-label {
          font-size: 11px;
          font-weight: 500;
          color: #2C2A2A;
          text-align: center;
          line-height: 1.3;
          max-width: 80px;
          letter-spacing: 0.02em;
        }

        .trust-item.hovered .trust-item-label {
          color: #60182d;
        }

        /* Tablet and Desktop */
        @media (min-width: 768px) {
          .trust-bar-root {
            padding: 32px 24px;
          }

          .trust-bar-header {
            margin-bottom: 32px;
          }

          .trust-bar-title {
            font-size: 20px;
          }

          .trust-bar-title::before,
          .trust-bar-title::after {
            width: 60px;
          }

          .trust-bar-title::before {
            left: -50px;
          }

          .trust-bar-title::after {
            right: -50px;
          }

          .trust-items-mobile {
            display: none;
          }

          .trust-items-desktop {
            display: flex;
            flex-wrap: wrap;
          }

          .trust-item {
            min-width: 100px;
          }

          .trust-item-icon {
            width: 72px;
            height: 72px;
          }

          .trust-item-icon svg {
            width: 36px;
            height: 36px;
          }

          .trust-item-label {
            font-size: 12px;
            max-width: 100px;
          }
        }

        /* Large Desktop */
        @media (min-width: 1024px) {
          .trust-items-desktop {
            gap: 40px;
          }

          .trust-item-icon {
            width: 80px;
            height: 80px;
          }

          .trust-item-icon svg {
            width: 40px;
            height: 40px;
          }

          .trust-item-label {
            font-size: 13px;
            max-width: 110px;
          }
        }

        /* Small mobile */
        @media (max-width: 480px) {
          .trust-bar-root {
            padding: 20px 12px;
          }

          .trust-bar-title {
            font-size: 16px;
            letter-spacing: 0.25em;
          }

          .trust-bar-title::before,
          .trust-bar-title::after {
            width: 30px;
          }

          .trust-bar-title::before {
            left: -25px;
          }

          .trust-bar-title::after {
            right: -25px;
          }

          .trust-item {
            min-width: 70px;
          }

          .trust-item-icon {
            width: 56px;
            height: 56px;
          }

          .trust-item-icon svg {
            width: 28px;
            height: 28px;
          }

          .trust-item-label {
            font-size: 10px;
            max-width: 70px;
          }
        }
      `}</style>

      <div className="trust-bar-root">
        {/* Header with Our Promise */}
        <div className="trust-bar-header">
          <span className="trust-bar-title">OUR PROMISE</span>
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="trust-items-mobile">
          {items.map((item, i) => (
            <div
              key={i}
              className={`trust-item${hovered === i ? " hovered" : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="trust-item-icon">{item.icon}</div>
              <span className="trust-item-label">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="trust-items-desktop">
          {items.map((item, i) => (
            <div
              key={i}
              className={`trust-item${hovered === i ? " hovered" : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="trust-item-icon">{item.icon}</div>
              <span className="trust-item-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
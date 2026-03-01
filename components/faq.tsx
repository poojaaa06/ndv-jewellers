'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'What are lab grown diamonds?',
    a: 'Lab grown diamonds are real diamonds created in a controlled laboratory environment using advanced technology that replicates the natural diamond-growing process. They have the same physical, chemical, and optical properties as mined diamonds.',
  },
  {
    q: 'Why choose lab grown diamonds?',
    a: 'Lab grown diamonds are an ethical, sustainable, and affordable alternative to mined diamonds. They are conflict-free, environmentally responsible, and offer the same brilliance and durability at a fraction of the cost.',
  },
  {
    q: 'Do lab grown diamonds cost less than mined diamonds?',
    a: 'Yes. Lab grown diamonds typically cost 40–70% less than mined diamonds of comparable quality, making them an excellent choice for those who want exceptional value without compromising on beauty.',
  },
  {
    q: 'What are the 4Cs of lab grown diamonds?',
    a: 'Just like mined diamonds, lab grown diamonds are graded on Cut, Colour, Clarity, and Carat weight — the universal 4Cs standard. Each of our diamonds comes with an IGI or GIA certificate confirming these grades.',
  },
  {
    q: 'Are lab grown diamonds durable for daily wear?',
    a: 'Absolutely. Lab grown diamonds score 10 on the Mohs hardness scale — the same as natural diamonds — making them the hardest material on earth and perfectly suited for everyday jewellery.',
  },
  {
    q: 'What makes our lab grown diamond jewellery special?',
    a: 'Every piece is handcrafted by skilled Indian artisans, set with IGI-certified lab grown diamonds, and designed to be worn every day or on your most special occasions. We combine heritage craftsmanship with modern, ethical practices.',
  },
  {
    q: 'Where can I buy certified lab grown diamond jewellery?',
    a: 'You can shop our full collection right here on our website. Every purchase comes with an IGI certificate, a quality guarantee, and free insured shipping across India.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="font-serif py-12 px-4 md:px-6 bg-base">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#60182d] mb-4 relative inline-block">
          FAQs
          <span className="absolute -bottom-1 left-0 w-14 h-0.5 bg-[#c9a96e]"></span>
        </h2>

        {/* FAQ Items */}
        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b-2 border-[#e8e2db] last:border-b-2">
              <button
                className="w-full flex justify-between items-start gap-4 py-6 text-left hover:opacity-80 transition-opacity"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-serif text-lg md:text-xl font-bold text-[#60182d] flex-1 leading-tight">
                  {faq.q}
                </span>
                <span className={`text-[#c9a96e] text-2xl flex-shrink-0 transition-transform duration-300 ${
                  open === i ? 'rotate-180' : ''
                }`}>
                  ↓
                </span>
              </button>
              
              <div
                className={`font-serif text-base md:text-lg text-[#5a4a3a] leading-relaxed transition-all duration-400 overflow-hidden ${
                  open === i ? 'max-h-96 pb-6 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
                }`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
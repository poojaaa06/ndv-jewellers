import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-secondary">NDV</h3>
            <p className="text-sm text-background/80">
              Luxury lab-grown diamond jewelry crafted with precision and elegance.
            </p>
            <div className="flex gap-3 pt-4">
              <a href="#" className="p-2 bg-background/10 hover:bg-background/20 rounded-lg transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-background/10 hover:bg-background/20 rounded-lg transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-background/10 hover:bg-background/20 rounded-lg transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-background/10 hover:bg-background/20 rounded-lg transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background">Shop</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li><Link href="/shop" className="hover:text-background transition">All Products</Link></li>
              <li><Link href="/collections" className="hover:text-background transition">Collections</Link></li>
              <li><Link href="/shop?category=engagement" className="hover:text-background transition">Engagement Rings</Link></li>
              <li><Link href="/shop?category=wedding" className="hover:text-background transition">Wedding Bands</Link></li>
              <li><Link href="/custom" className="hover:text-background transition">Custom Design</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background">Company</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li><Link href="/about" className="hover:text-background transition">About Us</Link></li>
              <li><Link href="/diamond-guide" className="hover:text-background transition">Diamond Guide</Link></li>
              <li><Link href="/blog" className="hover:text-background transition">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-background transition">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-background transition">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background">Support</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li><Link href="/faq" className="hover:text-background transition">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-background transition">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-background transition">Returns</Link></li>
              <li><Link href="/warranty" className="hover:text-background transition">Warranty</Link></li>
              <li><Link href="/track-order" className="hover:text-background transition">Track Order</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background">Legal</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li><Link href="/privacy" className="hover:text-background transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-background transition">Terms & Conditions</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-background transition">Shipping Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-background transition">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Payment Methods */}
            <div className="space-y-3">
              <h5 className="font-semibold text-background text-sm">Secure Payment Methods</h5>
              <div className="flex flex-wrap gap-2">
                {['VISA', 'Mastercard', 'UPI', 'NetBanking', 'Apple Pay'].map((method) => (
                  <span key={method} className="px-3 py-1 bg-background/10 rounded text-xs text-background/80">
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-3">
              <h5 className="font-semibold text-background text-sm">Certifications</h5>
              <div className="flex flex-wrap gap-2">
                {['GIA Certified', 'IGI Certified', 'ISO 9001'].map((cert) => (
                  <span key={cert} className="px-3 py-1 bg-background/10 rounded text-xs text-background/80">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-background/20 pt-8 text-center text-sm text-background/80">
            <p>&copy; 2024 NDV Jewellers. All rights reserved. | Crafted with precision and elegance.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

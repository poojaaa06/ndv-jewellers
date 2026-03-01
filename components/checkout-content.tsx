'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Lock, ArrowLeft, Check } from 'lucide-react'

type CheckoutStep = 'login' | 'shipping' | 'payment' | 'confirmation'

export default function CheckoutContent() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login - in real app, would authenticate with backend
    if (email && password) {
      setIsLoggedIn(true)
      setCurrentStep('shipping')
    }
  }

  const orderTotal = 424000

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isLoggedIn ? (
          // Login Step - Compulsory
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-lg border border-border p-8 space-y-6">
              <div className="text-center">
                <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                  Sign In Required
                </h1>
                <p className="text-muted-foreground">
                  Please log in or create an account to complete your purchase
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition text-foreground"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition text-foreground"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-accent transition"
                >
                  Sign In
                </button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">or</span>
                </div>
              </div>

              {/* Sign Up */}
              <div className="text-center">
                <p className="text-muted-foreground mb-3">Don't have an account?</p>
                <button
                  onClick={() => {
                    // Mock signup - in real app would navigate to signup form
                    setIsLoggedIn(true)
                    setCurrentStep('shipping')
                  }}
                  className="w-full px-4 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition"
                >
                  Create Account
                </button>
              </div>

              {/* Back to Cart */}
              <Link href="/cart" className="flex items-center justify-center gap-2 text-primary hover:text-accent transition">
                <ArrowLeft className="w-4 h-4" />
                Back to Cart
              </Link>
            </div>
          </div>
        ) : (
          // Checkout Steps (after login)
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Steps Indicator */}
              <div className="flex gap-4 mb-8">
                {['shipping', 'payment', 'confirmation'].map((step, index) => (
                  <div key={step} className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                        step === currentStep
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < 2 && <div className="w-8 h-0.5 bg-border"></div>}
                  </div>
                ))}
              </div>

              {/* Shipping Step */}
              {currentStep === 'shipping' && (
                <div className="bg-card rounded-lg border border-border p-8 space-y-6">
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Shipping Address
                  </h2>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setCurrentStep('payment')
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          placeholder="John"
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Doe"
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        placeholder="123 Main Street"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          placeholder="New York"
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          placeholder="NY"
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          placeholder="10001"
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-accent transition"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <div className="bg-card rounded-lg border border-border p-8 space-y-6">
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Payment Method
                  </h2>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setCurrentStep('confirmation')
                    }}
                    className="space-y-4"
                  >
                    {/* Payment Options */}
                    <div className="space-y-3">
                      {['Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Apple Pay'].map(method => (
                        <label key={method} className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition">
                          <input
                            type="radio"
                            name="payment"
                            value={method}
                            className="w-4 h-4 cursor-pointer accent-primary"
                            defaultChecked={method === 'Credit Card'}
                          />
                          <span className="ml-3 font-semibold text-foreground">{method}</span>
                        </label>
                      ))}
                    </div>

                    {/* Card Details */}
                    <div className="space-y-4 pt-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            maxLength={4}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-accent transition"
                    >
                      Place Order
                    </button>
                  </form>
                </div>
              )}

              {/* Confirmation Step */}
              {currentStep === 'confirmation' && (
                <div className="bg-card rounded-lg border border-border p-8 space-y-6 text-center">
                  <Check className="w-16 h-16 text-primary mx-auto" />
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                      Order Confirmed!
                    </h2>
                    <p className="text-muted-foreground">
                      Your order has been placed successfully. You'll receive a confirmation email shortly.
                    </p>
                  </div>

                  <div className="bg-muted/50 p-6 rounded-lg space-y-2 text-left">
                    <p className="text-sm text-muted-foreground">Order ID: #NDV-2024-001234</p>
                    <p className="text-sm text-muted-foreground">Expected Delivery: 5-7 Business Days</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link href="/account" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-accent transition text-center">
                      View Order
                    </Link>
                    <Link href="/shop" className="w-full border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition text-center">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-6 space-y-6 sticky top-24">
                <h3 className="font-semibold text-foreground text-lg">Order Summary</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal</span>
                    <span>₹4,00,000</span>
                  </div>
                  <div className="flex justify-between text-primary">
                    <span>Discount</span>
                    <span>-₹76,000</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (18% GST)</span>
                    <span>₹72,000</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-primary">FREE</span>
                  </div>

                  <div className="border-t border-border pt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{orderTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="border-t border-border pt-4 space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Items in Order</p>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <p className="font-semibold text-foreground">Solitaire Diamond Ring</p>
                      <p className="text-xs text-muted-foreground">1.5 Carat × 1</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold text-foreground">Diamond Stud Earrings</p>
                      <p className="text-xs text-muted-foreground">0.5 Carat (Pair) × 1</p>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="space-y-2 text-xs text-muted-foreground pt-4 border-t border-border">
                  <p className="flex gap-2">
                    <Lock className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>SSL Encrypted</span>
                  </p>
                  <p className="flex gap-2">
                    <Lock className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>30-Day Returns</span>
                  </p>
                  <p className="flex gap-2">
                    <Lock className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Lifetime Warranty</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

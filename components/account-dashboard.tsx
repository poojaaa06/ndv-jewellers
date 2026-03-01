'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Package, Settings, LogOut, User, Edit, Download, Eye } from 'lucide-react'

type TabType = 'orders' | 'wishlist' | 'profile' | 'settings'

interface Order {
  id: string
  date: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  items: number
}

const mockOrders: Order[] = [
  {
    id: 'NDV-2024-001234',
    date: '2024-02-20',
    total: 424000,
    status: 'delivered',
    items: 2
  },
  {
    id: 'NDV-2024-001233',
    date: '2024-01-15',
    total: 250000,
    status: 'delivered',
    items: 1
  },
  {
    id: 'NDV-2024-001232',
    date: '2024-01-05',
    total: 180000,
    status: 'shipped',
    items: 1
  }
]

const mockWishlist = [
  {
    id: 1,
    name: 'Premium Pear Diamond Ring',
    price: 350000,
    carats: '2.5 Carat'
  },
  {
    id: 2,
    name: 'Diamond Tennis Bracelet',
    price: 450000,
    carats: '3.5 Carat'
  }
]

export default function AccountDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('orders')
  const [isEditing, setIsEditing] = useState(false)

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 space-y-4 sticky top-24">
              <div className="text-center pb-4 border-b border-border">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                  JD
                </div>
                <h3 className="font-semibold text-foreground">John Doe</h3>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'orders', label: 'My Orders', icon: Package },
                  { id: 'wishlist', label: 'Wishlist', icon: Heart },
                  { id: 'profile', label: 'Profile', icon: User },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map(item => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as TabType)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        activeTab === item.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  )
                })}
              </nav>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition font-medium">
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-foreground">My Orders</h2>
                  <p className="text-muted-foreground mt-1">Track and manage your purchases</p>
                </div>

                <div className="space-y-3">
                  {mockOrders.map(order => (
                    <div
                      key={order.id}
                      className="bg-card rounded-lg border border-border p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-lg transition"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-lg">{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {order.items} item{order.items > 1 ? 's' : ''}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-foreground">
                          ₹{order.total.toLocaleString('en-IN')}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              order.status === 'delivered'
                                ? 'bg-green-100 text-green-700'
                                : order.status === 'shipped'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/order/${order.id}`}
                        className="sm:ml-4 px-6 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition text-center text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-foreground">My Wishlist</h2>
                  <p className="text-muted-foreground mt-1">Items you're interested in</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockWishlist.map(item => (
                    <div key={item.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition">
                      <div className="aspect-square bg-muted flex items-center justify-center text-muted-foreground">
                        {item.name}
                      </div>
                      <div className="p-6 space-y-3">
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.carats}</p>
                        <p className="font-bold text-foreground text-lg">
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-accent transition text-sm">
                            Add to Cart
                          </button>
                          <button className="flex-1 border border-primary text-primary py-2 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition text-sm">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-3xl font-bold text-foreground">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition"
                  >
                    <Edit className="w-4 h-4" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                <div className="bg-card rounded-lg border border-border p-8 space-y-6">
                  {isEditing ? (
                    // Edit Form
                    <form className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            defaultValue="John"
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Doe"
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue="john@example.com"
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          defaultValue="+1 (555) 000-0000"
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-accent transition"
                      >
                        Save Changes
                      </button>
                    </form>
                  ) : (
                    // Display Form
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">First Name</p>
                          <p className="font-semibold text-foreground">John</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Last Name</p>
                          <p className="font-semibold text-foreground">Doe</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                        <p className="font-semibold text-foreground">john@example.com</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
                        <p className="font-semibold text-foreground">+1 (555) 000-0000</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="font-serif text-3xl font-bold text-foreground">Settings</h2>

                <div className="space-y-4">
                  {[
                    { label: 'Email Notifications', desc: 'Receive updates about orders and promotions', enabled: true },
                    { label: 'Marketing Communications', desc: 'Get exclusive offers and product launches', enabled: false },
                    { label: 'SMS Notifications', desc: 'Receive order updates via SMS', enabled: true },
                    { label: 'Two-Factor Authentication', desc: 'Enhance your account security', enabled: false }
                  ].map((setting, i) => (
                    <div
                      key={i}
                      className="bg-card rounded-lg border border-border p-6 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-foreground">{setting.label}</p>
                        <p className="text-sm text-muted-foreground">{setting.desc}</p>
                      </div>
                      <label className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          defaultChecked={setting.enabled}
                          className="sr-only"
                        />
                        <div
                          className={`block w-full h-full rounded-full transition ${
                            setting.enabled ? 'bg-primary' : 'bg-border'
                          }`}
                        ></div>
                        <div
                          className={`absolute left-1 top-1 bg-background w-4 h-4 rounded-full transition ${
                            setting.enabled ? 'translate-x-6' : ''
                          }`}
                        ></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Danger Zone</h3>
                  <button className="w-full px-4 py-3 border-2 border-destructive text-destructive rounded-lg font-semibold hover:bg-destructive hover:text-background transition">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

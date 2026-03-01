'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import { filterOptions } from '@/lib/data'

interface ProductFiltersProps {
  onFilterChange?: (filters: any) => void
  initialFilters?: any
}

const colorSwatches: Record<string, string> = {
  White: '#F5F0EB', Yellow: '#E8C547', Rose: '#E8A598', Champagne: '#C9A96E',
}
const metalSwatches: Record<string, string> = {
  '14K Gold': '#C9A96E', '18K Gold': '#E8C547', 'Platinum': '#C5C5D0',
  'White Gold': '#D8D8E0', 'Rose Gold': '#E8A598',
}

export default function ProductFilters({ onFilterChange, initialFilters = {} }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['price', 'metal', 'color', 'style', 'occasion'])
  )
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>(initialFilters)

  useEffect(() => {
    if (onFilterChange) onFilterChange(selectedFilters)
  }, [selectedFilters, onFilterChange])

  const toggleSection = (key: string) => {
    setExpandedSections(prev => {
      const s = new Set(prev)
      s.has(key) ? s.delete(key) : s.add(key)
      return s
    })
  }

 const toggleFilter = (key: string, value: string) => {
  setSelectedFilters((prev: Record<string, string[]>) => {
    const cur = prev[key] || []
    const next = cur.includes(value) 
      ? cur.filter((v: string) => v !== value) 
      : [...cur, value]
    
    const f = { ...prev }
    if (next.length > 0) {
      f[key] = next
    } else {
      delete f[key]
    }
    return f
  })
}

  const hasActive = Object.values(selectedFilters).some(a => a && a.length > 0)

  const sections = [
    { title: 'Shop By Price', key: 'price', type: 'checkbox' as const, options: filterOptions.price },
    { title: 'Metal Purity', key: 'metal', type: 'swatch' as const, options: filterOptions.metal },
    { title: 'Color', key: 'color', type: 'swatch' as const, options: filterOptions.color },
    { title: 'Style', key: 'style', type: 'pill' as const, options: filterOptions.style },
    { title: 'Occasion', key: 'occasion', type: 'checkbox' as const, options: filterOptions.occasion },
  ]

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary" strokeWidth={1.5} />
          <span className="text-sm font-semibold tracking-widest uppercase">Filters</span>
        </div>
        {hasActive && (
          <button onClick={() => setSelectedFilters({})} className="text-xs text-muted-foreground hover:text-primary underline underline-offset-2">
            Clear all
          </button>
        )}
      </div>

      {sections.map(section => (
        <div key={section.key} className="border-t border-border/60 last:border-b">
          <button
            onClick={() => toggleSection(section.key)}
            className="w-full flex items-center justify-between py-3 group"
          >
            <span className="text-[13px] font-semibold tracking-wide group-hover:text-primary transition">{section.title}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${expandedSections.has(section.key) ? 'rotate-180' : ''}`} />
          </button>

          {expandedSections.has(section.key) && (
            <div className="pb-4">
              {section.type === 'swatch' && (
                <div className="flex flex-wrap gap-2">
                  {section.options.map(opt => {
                    const sel = selectedFilters[section.key]?.includes(opt.value)
                    const bg = section.key === 'color' ? colorSwatches[opt.value] : metalSwatches[opt.value]
                    return (
                      <button key={opt.value} onClick={() => toggleFilter(section.key, opt.value)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[11px] font-medium transition-all ${sel ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
                        <span className="w-3 h-3 rounded-full border border-black/10 flex-shrink-0" style={{ backgroundColor: bg }} />
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              )}
              {section.type === 'pill' && (
                <div className="flex flex-wrap gap-1.5">
                  {section.options.map(opt => {
                    const sel = selectedFilters[section.key]?.includes(opt.value)
                    return (
                      <button key={opt.value} onClick={() => toggleFilter(section.key, opt.value)}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-all ${sel ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              )}
              {section.type === 'checkbox' && (
                <div className="space-y-2.5">
                  {section.options.map(opt => {
                    const sel = selectedFilters[section.key]?.includes(opt.value)
                    return (
                      <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                        <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${sel ? 'bg-primary border-primary' : 'border-border group-hover:border-primary/50'}`}>
                          {sel && <svg className="w-2.5 h-2.5 text-primary-foreground" fill="none" viewBox="0 0 10 10"><path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        </span>
                        <input type="checkbox" checked={sel || false} onChange={() => toggleFilter(section.key, opt.value)} className="sr-only" />
                        <span className={`text-[13px] transition ${sel ? 'text-primary font-medium' : 'text-foreground/80 group-hover:text-foreground'}`}>{opt.label}</span>
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
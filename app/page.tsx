'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from './providers'
import DashboardVariant1 from './components/DashboardVariant1'
import DashboardVariant2 from './components/DashboardVariant2'
import DashboardVariant3 from './components/DashboardVariant3'
import { Globe, Menu, X } from 'lucide-react'

export default function Home() {
  const { language, setLanguage, t } = useLanguage()
  const [currentVariant, setCurrentVariant] = useState(1)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const variants = [
    { id: 1, name: 'Card-based Layout', component: DashboardVariant1 },
    { id: 2, name: 'Grid Layout with Sidebar', component: DashboardVariant2 },
    { id: 3, name: 'Mobile-first Design', component: DashboardVariant3 }
  ]

  const CurrentComponent = variants.find(v => v.id === currentVariant)?.component || DashboardVariant1

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                {t('advisory_system')}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
              </button>

              {/* Variant Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <Menu className="h-4 w-4" />
                  <span>UI Variants</span>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <div className="py-1">
                      {variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => {
                            setCurrentVariant(variant.id)
                            setIsMenuOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2 text-sm ${
                            currentVariant === variant.id
                              ? 'bg-primary-50 text-primary-700'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {variant.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('smart_farming')} - {variants.find(v => v.id === currentVariant)?.name}
          </h2>
          <p className="text-gray-600">
            {t('farmer_friendly')} • {t('mobile_responsive')} • Real-time Data
          </p>
        </div>

        <CurrentComponent />
      </main>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  )
}

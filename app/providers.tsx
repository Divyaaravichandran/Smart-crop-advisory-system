'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface LanguageContextType {
  language: 'en' | 'hi'
  setLanguage: (lang: 'en' | 'hi') => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    dashboard: 'Dashboard',
    weather: 'Weather',
    soil: 'Soil Health',
    yield: 'Yield Data',
    pests: 'Pest Alerts',
    recommendations: 'Recommendations',
    temperature: 'Temperature',
    humidity: 'Humidity',
    rainfall: 'Rainfall',
    ph_level: 'pH Level',
    nitrogen: 'Nitrogen',
    phosphorus: 'Phosphorus',
    potassium: 'Potassium',
    crop_yield: 'Crop Yield',
    disease_status: 'Disease Status',
    advisory_system: 'Advisory System',
    smart_farming: 'Smart Farming',
    farmer_friendly: 'Farmer Friendly',
    mobile_responsive: 'Mobile Responsive',
    view_details: 'View Details',
    high_priority: 'High Priority',
    medium_priority: 'Medium Priority',
    low_priority: 'Low Priority',
    pending: 'Pending',
    completed: 'Completed',
    mild: 'Mild',
    moderate: 'Moderate',
    severe: 'Severe',
    none: 'None',
    organic: 'Organic',
    inorganic: 'Inorganic',
    mixed: 'Mixed',
    sprinkler: 'Sprinkler',
    drip: 'Drip',
    manual: 'Manual',
    none_irrigation: 'None'
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    weather: 'मौसम',
    soil: 'मिट्टी का स्वास्थ्य',
    yield: 'उपज डेटा',
    pests: 'कीट अलर्ट',
    recommendations: 'सुझाव',
    temperature: 'तापमान',
    humidity: 'आर्द्रता',
    rainfall: 'वर्षा',
    ph_level: 'pH स्तर',
    nitrogen: 'नाइट्रोजन',
    phosphorus: 'फॉस्फोरस',
    potassium: 'पोटेशियम',
    crop_yield: 'फसल उपज',
    disease_status: 'रोग की स्थिति',
    advisory_system: 'सलाहकार प्रणाली',
    smart_farming: 'स्मार्ट खेती',
    farmer_friendly: 'किसान अनुकूल',
    mobile_responsive: 'मोबाइल अनुकूल',
    view_details: 'विवरण देखें',
    high_priority: 'उच्च प्राथमिकता',
    medium_priority: 'मध्यम प्राथमिकता',
    low_priority: 'कम प्राथमिकता',
    pending: 'लंबित',
    completed: 'पूर्ण',
    mild: 'हल्का',
    moderate: 'मध्यम',
    severe: 'गंभीर',
    none: 'कोई नहीं',
    organic: 'जैविक',
    inorganic: 'अजैविक',
    mixed: 'मिश्रित',
    sprinkler: 'स्प्रिंकलर',
    drip: 'ड्रिप',
    manual: 'मैनुअल',
    none_irrigation: 'कोई नहीं'
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'hi'>('en')

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

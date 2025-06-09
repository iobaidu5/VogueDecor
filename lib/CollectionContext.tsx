// lib/CollectionContext.tsx
'use client'
import { createContext, useContext, useState } from 'react'

type CollectionContextType = {
  collection: string | null | undefined
  setCollection: (value: string | null | undefined) => void
}

// 👇 Provide a default value of null (temporarily)
const CollectionContext = createContext<CollectionContextType | null>(null)

export const CollectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [collection, setCollection] = useState<string | null>(null)

  return (
    <CollectionContext.Provider value={{ collection, setCollection }}>
      {children}
    </CollectionContext.Provider>
  )
}

export const useCollection = () => {
  const context = useContext(CollectionContext)
  if (!context) {
    throw new Error('useCollection must be used within a CollectionProvider')
  }
  return context
}

// lib/CollectionContext.tsx
'use client'
import { createContext, useContext, useState } from 'react'

const CollectionContext = createContext(null)

export const CollectionProvider = ({ children }) => {
  const [collection, setCollection] = useState(null)
  return (
    <CollectionContext.Provider value={{ collection, setCollection }}>
      {children}
    </CollectionContext.Provider>
  )
}

export const useCollection = () => useContext(CollectionContext)

import { createContext, useContext, useState } from 'react'

const LightboxContext = createContext(null)

export function LightboxProvider({ children }) {
  const [imageUrl, setImageUrl] = useState(null)
  const [zoom, setZoom] = useState(1)

  const openLightbox = (url) => {
    setImageUrl(url)
    setZoom(1)
  }

  const closeLightbox = () => {
    setImageUrl(null)
  }

  const zoomIn = () => setZoom((z) => Math.min(3, z + 0.25))
  const zoomOut = () => setZoom((z) => Math.max(0.5, z - 0.25))

  return (
    <LightboxContext.Provider value={{ imageUrl, zoom, openLightbox, closeLightbox, zoomIn, zoomOut }}>
      {children}
    </LightboxContext.Provider>
  )
}

export function useLightbox() {
  const ctx = useContext(LightboxContext)
  if (!ctx) throw new Error('useLightbox must be used within LightboxProvider')
  return ctx
}

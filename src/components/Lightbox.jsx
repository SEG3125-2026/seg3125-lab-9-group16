import { useEffect } from 'react'
import { useLightbox } from '../context/LightboxContext'

export default function Lightbox() {
  const { imageUrl, zoom, closeLightbox, zoomIn, zoomOut } = useLightbox()

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
    }
    if (imageUrl) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKey)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [imageUrl, closeLightbox])

  if (!imageUrl) return null

  return (
    <div className="lightbox" onClick={(e) => e.target.className === 'lightbox' && closeLightbox()} role="dialog" aria-modal="true" aria-label="Image viewer">
      <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">×</button>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="" style={{ transform: `scale(${zoom})` }} />
        <div className="lightbox-zoom-controls">
          <button className="lightbox-zoom-btn" onClick={zoomOut} aria-label="Zoom out">−</button>
          <span>{Math.round(zoom * 100)}%</span>
          <button className="lightbox-zoom-btn" onClick={zoomIn} aria-label="Zoom in">+</button>
        </div>
      </div>
    </div>
  )
}

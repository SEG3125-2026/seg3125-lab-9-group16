import { useLightbox } from '../context/LightboxContext'

export default function ZoomableImage({ src, alt, className, style }) {
  const { openLightbox } = useLightbox()

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    openLightbox(src)
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick(e)}
      title="Click to enlarge"
    />
  )
}

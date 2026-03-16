import { Link } from 'react-router-dom'
import { useLightbox } from '../context/LightboxContext'

export default function ZoomableCard({ doc }) {
  const { openLightbox } = useLightbox()

  const handleImageClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    openLightbox(doc.image)
  }

  return (
    <Link to={`/document/${doc.slug}`} className="card">
      <div
        className="card-image"
        style={{ backgroundImage: `url('${doc.image}')` }}
        onClick={handleImageClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleImageClick(e)}
        title="Click to enlarge"
      />
      <div className="card-content">
        <span className="card-museum">{doc.museum}</span>
        <h3>{doc.title}</h3>
      </div>
    </Link>
  )
}

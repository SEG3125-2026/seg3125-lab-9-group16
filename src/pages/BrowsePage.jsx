import { Link } from 'react-router-dom'
import { useDocuments } from '../hooks/useDocuments'
import { useLightbox } from '../context/LightboxContext'

export default function BrowsePage() {
  const documents = useDocuments()
  const { openLightbox } = useLightbox()

  const handleImageClick = (e, doc) => {
    e.preventDefault()
    e.stopPropagation()
    openLightbox(doc.image)
  }

  return (
    <section className="page">
      <h2>Browse Collection</h2>
      <div className="browse-list">
        {documents.map((doc) => (
          <Link key={doc.id} to={`/document/${doc.slug}`} className="browse-item">
            <div
              className="browse-item-image"
              style={{ backgroundImage: `url('${doc.image}')` }}
              onClick={(e) => handleImageClick(e, doc)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleImageClick(e, doc)}
              title="Click to enlarge"
            />
            <div className="browse-item-content">
              <h3>{doc.title}</h3>
              <span className="museum">{doc.museum}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

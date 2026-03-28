import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLightbox } from '../context/LightboxContext'
import { pickLocalized } from '../utils/documentLocale'

export default function ZoomableCard({ doc }) {
  const { t, i18n } = useTranslation()
  const loc = pickLocalized(doc, i18n.language)
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
        title={t('common.clickToEnlarge')}
      />
      <div className="card-content">
        <span className="card-museum">{loc.museum}</span>
        <h3>{loc.title}</h3>
      </div>
    </Link>
  )
}

import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDocuments } from '../hooks/useDocuments'
import { useLightbox } from '../context/LightboxContext'
import { pickLocalized } from '../utils/documentLocale'

export default function BrowsePage() {
  const { t, i18n } = useTranslation()
  const documents = useDocuments()
  const { openLightbox } = useLightbox()

  const handleImageClick = (e, doc) => {
    e.preventDefault()
    e.stopPropagation()
    openLightbox(doc.image)
  }

  return (
    <section className="page">
      <h2>{t('browse.title')}</h2>
      <div className="browse-list">
        {documents.map((doc) => {
          const loc = pickLocalized(doc, i18n.language)
          return (
            <Link key={doc.id} to={`/document/${doc.slug}`} className="browse-item">
              <div
                className="browse-item-image"
                style={{ backgroundImage: `url('${doc.image}')` }}
                onClick={(e) => handleImageClick(e, doc)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleImageClick(e, doc)}
                title={t('common.clickToEnlarge')}
              />
              <div className="browse-item-content">
                <h3>{loc.title}</h3>
                <span className="museum">{loc.museum}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDocuments } from '../hooks/useDocuments'
import ZoomableCard from '../components/ZoomableCard'

export default function HomePage() {
  const { t } = useTranslation()
  const documents = useDocuments()

  return (
    <section className="page">
      <div className="hero">
        <h1>{t('home.title')}</h1>
        <p className="hero-subtitle">
          {t('home.subtitle')}
        </p>
        <Link to="/browse" className="btn btn-primary">{t('home.browseBtn')}</Link>
      </div>
      <div className="featured-grid">
        {documents.map((doc) => (
          <ZoomableCard key={doc.id} doc={doc} />
        ))}
      </div>
    </section>
  )
}

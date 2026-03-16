import { Link } from 'react-router-dom'
import { useDocuments } from '../hooks/useDocuments'
import ZoomableCard from '../components/ZoomableCard'

export default function HomePage() {
  const documents = useDocuments()

  return (
    <section className="page">
      <div className="hero">
        <h1>Canadian Art & History</h1>
        <p className="hero-subtitle">
          Explore museum collections from across Canada — photographs, paintings, and cultural artifacts with audio descriptions.
        </p>
        <Link to="/browse" className="btn btn-primary">Browse Collection</Link>
      </div>
      <div className="featured-grid">
        {documents.map((doc) => (
          <ZoomableCard key={doc.id} doc={doc} />
        ))}
      </div>
    </section>
  )
}

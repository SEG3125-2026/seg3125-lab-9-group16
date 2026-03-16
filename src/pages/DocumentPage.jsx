import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDocuments } from '../hooks/useDocuments'
import ZoomableImage from '../components/ZoomableImage'

const STORAGE_KEY = 'heritage-archive-comments'

function getComments(docId) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return all[docId] || []
  } catch {
    return []
  }
}

function saveComment(docId, text) {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  if (!all[docId]) all[docId] = []
  all[docId].push({ id: Date.now(), text, author: 'Anonymous', date: new Date().toISOString() })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

function buildMetaFields(meta) {
  const skip = ['title', 'description', 'catalogue_description', 'scope_and_content', 'related_material', 'subjects']
  return Object.entries(meta)
    .filter(([key, value]) => !skip.includes(key) && value != null && value !== '')
    .filter(([, value]) => (Array.isArray(value) ? value.join(', ') : String(value)).length <= 200)
    .map(([key, value]) => (
      <div key={key} className="document-meta-item">
        <strong>{key.replace(/_/g, ' ')}</strong>
        {Array.isArray(value) ? value.join(', ') : String(value)}
      </div>
    ))
}

export default function DocumentPage() {
  const { slug } = useParams()
  const documents = useDocuments()
  const doc = documents.find((d) => d.slug === slug)

  const [meta, setMeta] = useState(null)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState([])

  useEffect(() => {
    if (!doc) return
    setComments(getComments(doc.id))
    fetch(doc.data)
      .then((res) => res.json())
      .then(setMeta)
      .catch(() => setMeta({}))
  }, [doc])

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = commentText.trim()
    if (!text || !doc) return
    saveComment(doc.id, text)
    setCommentText('')
    setComments(getComments(doc.id))
  }

  if (!doc) return <p className="error-message">Document not found.</p>

  const description = meta?.catalogue_description || meta?.related_material || meta?.description || meta?.scope_and_content || ''
  const metaFields = meta ? buildMetaFields(meta) : []

  return (
    <section className="page">
      <Link to="/browse" className="back-link">← Back to Browse</Link>
      <div className="document-content">
        <div className="document-image-wrap">
          <ZoomableImage src={doc.image} alt={doc.title} className="document-img" />
        </div>
        <div className="document-body">
          <h2>{doc.title}</h2>
          <p className="document-meta">{doc.museum}</p>
          {description && <div className="document-description">{description}</div>}
          {metaFields.length > 0 && <div className="document-meta-grid">{metaFields}</div>}
          <div className="audio-section">
            <h4>Listen to audio description</h4>
            <audio controls preload="metadata">
              <source src={doc.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
      <div className="comments-section">
        <h3>Comments</h3>
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your thoughts..."
            rows={3}
            required
          />
          <button type="submit" className="btn btn-primary">Post Comment</button>
        </form>
        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="empty-comments">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="comment">
                <div className="comment-meta">{c.author} · {new Date(c.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                <div className="comment-text">{c.text}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

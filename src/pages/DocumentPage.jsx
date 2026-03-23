import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDocuments } from '../hooks/useDocuments'
import ZoomableImage from '../components/ZoomableImage'

const API_BASE = '/api'

async function fetchComments(docId) {
  const res = await fetch(`${API_BASE}/comments/${docId}`)
  if (!res.ok) return []
  return res.json()
}

async function postComment(docId, text) {
  const res = await fetch(`${API_BASE}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ document_id: docId, text, author: 'Anonymous' }),
  })
  if (!res.ok) throw new Error('Failed to post comment')
  return res.json()
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
  const { t } = useTranslation()
  const { slug } = useParams()
  const documents = useDocuments()
  const doc = documents.find((d) => d.slug === slug)

  const [meta, setMeta] = useState(null)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState([])
  const [commentError, setCommentError] = useState(null)
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    if (!doc) return
    fetchComments(doc.id)
      .then(setComments)
      .catch(() => setComments([]))
    fetch(doc.data)
      .then((res) => res.json())
      .then(setMeta)
      .catch(() => setMeta({}))
  }, [doc])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const text = commentText.trim()
    if (!text || !doc || posting) return
    setPosting(true)
    setCommentError(null)
    try {
      await postComment(doc.id, text)
      setCommentText('')
      const updated = await fetchComments(doc.id)
      setComments(updated)
    } catch (err) {
      setCommentError(err.message)
    } finally {
      setPosting(false)
    }
  }

  if (!doc) return <p className="error-message">{t('document.notFound')}</p>

  const description = meta?.catalogue_description || meta?.related_material || meta?.description || meta?.scope_and_content || ''
  const metaFields = meta ? buildMetaFields(meta) : []

  return (
    <section className="page">
      <Link to="/browse" className="back-link">{t('document.backToBrowse')}</Link>
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
            <h4>{t('document.audioLabel')}</h4>
            <audio controls preload="metadata">
              <source src={doc.audio} type="audio/mpeg" />
              {t('document.audioUnsupported')}
            </audio>
          </div>
        </div>
      </div>
      <div className="comments-section">
        <h3>{t('document.comments')}</h3>
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={t('document.sharePlaceholder')}
            rows={3}
            required
            disabled={posting}
          />
          {commentError && <p className="comment-error">{commentError}</p>}
          <button type="submit" className="btn btn-primary" disabled={posting}>
            {posting ? '...' : t('document.postComment')}
          </button>
        </form>
        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="empty-comments">{t('document.emptyComments')}</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="comment">
                <div className="comment-meta">{c.author} · {new Date(c.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                <div className="comment-text">{c.text}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

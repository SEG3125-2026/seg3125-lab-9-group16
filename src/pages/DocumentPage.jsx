import { useState, useEffect, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDocuments } from '../hooks/useDocuments'
import ZoomableImage from '../components/ZoomableImage'
import { pickLocalized, resolvePublicUrl } from '../utils/documentLocale'

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
  const skip = ['title', 'description', 'catalogue_description', 'scope_and_content', 'related_material', 'subjects', 'spoken_narration_fr']
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
  const { t, i18n } = useTranslation()
  const { slug } = useParams()
  const documents = useDocuments()
  const doc = documents.find((d) => d.slug === slug)

  const [meta, setMeta] = useState(null)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState([])
  const [commentError, setCommentError] = useState(null)
  const [posting, setPosting] = useState(false)
  const [ttsPlaying, setTtsPlaying] = useState(false)

  const stopFrenchTts = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    setTtsPlaying(false)
  }, [])

  const toggleFrenchTts = useCallback((text) => {
    if (!text || typeof window === 'undefined' || !window.speechSynthesis) return
    if (ttsPlaying) {
      stopFrenchTts()
      return
    }
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'fr-CA'
    u.onend = () => setTtsPlaying(false)
    u.onerror = () => setTtsPlaying(false)
    window.speechSynthesis.speak(u)
    setTtsPlaying(true)
  }, [ttsPlaying, stopFrenchTts])

  useEffect(() => {
    if (!doc) return
    fetchComments(doc.id)
      .then(setComments)
      .catch(() => setComments([]))
  }, [doc])

  useEffect(() => {
    if (!doc) return
    const { dataUrl } = pickLocalized(doc, i18n.language)
    fetch(resolvePublicUrl(dataUrl))
      .then((res) => res.json())
      .then(setMeta)
      .catch(() => setMeta({}))
  }, [doc, i18n.language])

  useEffect(() => {
    stopFrenchTts()
  }, [i18n.language, stopFrenchTts])

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

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

  const loc = pickLocalized(doc, i18n.language)
  const isFr = i18n.language.startsWith('fr')
  const useFrTts = isFr && meta?.spoken_narration_fr && !doc.audio_fr
  const description = meta?.catalogue_description || meta?.related_material || meta?.description || meta?.scope_and_content || ''
  const metaFields = meta ? buildMetaFields(meta) : []

  return (
    <section className="page">
      <Link to="/browse" className="back-link">{t('document.backToBrowse')}</Link>
      <div className="document-content">
        <div className="document-image-wrap">
          <ZoomableImage src={doc.image} alt={loc.title} className="document-img" />
        </div>
        <div className="document-body">
          <h2>{loc.title}</h2>
          <p className="document-meta">{loc.museum}</p>
          {doc.subtitle && (
            <p className="document-subtitle">{isFr && doc.subtitle_fr ? doc.subtitle_fr : doc.subtitle}</p>
          )}
          {description && <div className="document-description">{description}</div>}
          {metaFields.length > 0 && <div className="document-meta-grid">{metaFields}</div>}
          <div className="audio-section">
            {useFrTts ? (
              <>
                <h4>{t('document.audioLabelFrTts')}</h4>
                <p className="document-narration-fr">{meta.spoken_narration_fr}</p>
                <button
                  type="button"
                  className="btn btn-primary tts-btn"
                  onClick={() => toggleFrenchTts(meta.spoken_narration_fr)}
                >
                  {ttsPlaying ? t('document.stopFrenchNarration') : t('document.listenFrenchNarration')}
                </button>
              </>
            ) : (
              <>
                <h4>{t('document.audioLabel')}</h4>
                <audio controls preload="metadata">
                  <source src={loc.audioUrl} type="audio/mpeg" />
                  {t('document.audioUnsupported')}
                </audio>
              </>
            )}
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

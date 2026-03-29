/**
 * Same-origin paths served from public/ (e.g. /data/config.json, /documents/...).
 * On GitHub Pages the app lives under import.meta.env.BASE_URL, so absolute
 * paths from the domain root 404 unless prefixed.
 */
/** API routes follow the same base path as the SPA (GitHub Pages subpath). */
export function getApiBase() {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  return `${base}/api`
}

export function resolvePublicUrl(pathOrUrl) {
  if (!pathOrUrl) return pathOrUrl
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '')
  const path = pathOrUrl.replace(/^\//, '')
  return base ? `${base}/${path}` : `/${path}`
}

/** Pick EN/FR fields from config `documents` entries. */
export function pickLocalized(doc, lang) {
  const isFr = String(lang || 'en').toLowerCase().startsWith('fr')
  const rawAudio = isFr && doc.audio_fr ? doc.audio_fr : doc.audio
  return {
    title: isFr && doc.title_fr ? doc.title_fr : doc.title,
    subtitle: isFr && doc.subtitle_fr ? doc.subtitle_fr : doc.subtitle,
    museum: isFr && doc.museum_fr ? doc.museum_fr : doc.museum,
    dataUrl: isFr && doc.data_fr ? doc.data_fr : doc.data,
    audioUrl: /^https?:\/\//i.test(String(rawAudio)) ? rawAudio : resolvePublicUrl(rawAudio),
  }
}

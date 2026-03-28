/** Pick EN/FR fields from config `documents` entries. */
export function pickLocalized(doc, lang) {
  const isFr = String(lang || 'en').toLowerCase().startsWith('fr')
  return {
    title: isFr && doc.title_fr ? doc.title_fr : doc.title,
    subtitle: isFr && doc.subtitle_fr ? doc.subtitle_fr : doc.subtitle,
    museum: isFr && doc.museum_fr ? doc.museum_fr : doc.museum,
    dataUrl: isFr && doc.data_fr ? doc.data_fr : doc.data,
    audioUrl: isFr && doc.audio_fr ? doc.audio_fr : doc.audio,
  }
}

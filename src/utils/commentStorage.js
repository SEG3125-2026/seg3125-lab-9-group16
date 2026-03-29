const KEY = 'heritage-archive-comments-v1'

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

export function loadLocalComments(docId) {
  const all = readAll()
  return all[docId] || []
}

export function saveLocalComment(docId, text, author = 'Anonymous') {
  const all = readAll()
  const list = all[docId] || []
  const row = {
    id: `local-${Date.now()}`,
    document_id: docId,
    author,
    text,
    date: new Date().toISOString(),
    localOnly: true,
  }
  all[docId] = [row, ...list]
  localStorage.setItem(KEY, JSON.stringify(all))
  return row
}

import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, 'heritage.db')
const db = new Database(dbPath)

db.exec(`
  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    document_id TEXT NOT NULL,
    author TEXT DEFAULT 'Anonymous',
    text TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_comments_document ON comments(document_id);
`)

export function getComments(docId) {
  const stmt = db.prepare('SELECT id, document_id, author, text, created_at as date FROM comments WHERE document_id = ? ORDER BY created_at DESC')
  return stmt.all(docId)
}

export function addComment(docId, text, author = 'Anonymous') {
  const stmt = db.prepare('INSERT INTO comments (document_id, author, text) VALUES (?, ?, ?)')
  const result = stmt.run(docId, author, text)
  return { id: result.lastInsertRowid, document_id: docId, author, text, date: new Date().toISOString() }
}

export default db

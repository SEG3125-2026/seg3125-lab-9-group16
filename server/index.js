import express from 'express'
import cors from 'cors'
import { getComments, addComment } from './db.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.get('/api/comments/:docId', (req, res) => {
  try {
    const comments = getComments(req.params.docId)
    res.json(comments)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/comments', (req, res) => {
  try {
    const { document_id, text, author } = req.body
    if (!document_id || !text) {
      return res.status(400).json({ error: 'document_id and text required' })
    }
    const comment = addComment(document_id, text || '', author || 'Anonymous')
    res.status(201).json(comment)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Heritage Archive API running at http://localhost:${PORT}`)
})

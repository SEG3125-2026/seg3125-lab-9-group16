import { useState, useEffect } from 'react'

const CONFIG_URL = '/data/config.json'
const FALLBACK = [
  { id: 'theBattle', slug: 'the-battle', title: '29th Infantry Battalion at Vimy Ridge', museum: 'Canadian War Museum', image: 'https://raw.githubusercontent.com/SEG3125-2026/seg3125-lab-7-team-16/main/documents/theBattle/image.png', audio: 'https://raw.githubusercontent.com/SEG3125-2026/seg3125-lab-7-team-16/main/documents/theBattle/audiobook.mp3', data: 'https://raw.githubusercontent.com/SEG3125-2026/seg3125-lab-7-team-16/main/documents/theBattle/data.json' },
  { id: 'theDevil', slug: 'the-devil', title: 'The Devil (Taro Series XV)', museum: 'Ottawa Art Gallery', image: 'https://raw.githubusercontent.com/SEG3125-2026/seg3125-lab-7-team-16/main/documents/theDevil/image.png', audio: 'https://raw.githubusercontent.com/SEG3125-2026/seg3125-lab-7-team-16/main/documents/theDevil/audiobook.mp3', data: 'https://raw.githubusercontent.com/SEG3125-2026/seg3125-lab-7-team-16/main/documents/theDevil/data.json' },
  { id: 'thePianist', slug: 'the-pianist', title: 'The Pianist', museum: 'National Gallery of Canada', image: 'https://raw.githubusercontent.com/SEG3125-2026/seg3125-lab-7-team-16/main/documents/thePianist/image.png', audio: 'https://raw.githubusercontent.com/SEG3125-2026/seg3125-lab-7-team-16/main/documents/thePianist/audiobook.mp3', data: 'https://raw.githubusercontent.com/SEG3125-2026/seg3125-lab-7-team-16/main/documents/thePianist/data.json' }
]

export function useDocuments() {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    fetch(CONFIG_URL)
      .then((res) => res.json())
      .then((data) => setDocuments(data.documents || FALLBACK))
      .catch(() => setDocuments(FALLBACK))
  }, [])

  return documents
}

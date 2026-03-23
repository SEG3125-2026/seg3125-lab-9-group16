import { useTranslation } from 'react-i18next'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import BrowsePage from './pages/BrowsePage'
import DocumentPage from './pages/DocumentPage'
import HelpPage from './pages/HelpPage'
import Lightbox from './components/Lightbox'
import { LightboxProvider } from './context/LightboxContext'
import './App.css'

function App() {
  const { t } = useTranslation()
  return (
    <LightboxProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <div className="app">
          <Header />
          <main className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/document/:slug" element={<DocumentPage />} />
              <Route path="/help" element={<HelpPage />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>{t('footer.lab')} – Team 16 · {t('nav.logo')}</p>
            <p className="team-names">{t('footer.team')}</p>
          </footer>
          <Lightbox />
        </div>
      </BrowserRouter>
    </LightboxProvider>
  )
}

export default App

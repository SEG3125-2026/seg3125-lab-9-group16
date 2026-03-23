import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSelector from './LanguageSelector'

export default function Header() {
  const { t } = useTranslation()
  return (
    <header className="header">
      <Link to="/" className="logo">{t('nav.logo')}</Link>
      <nav className="nav">
        <Link to="/">{t('nav.home')}</Link>
        <Link to="/browse">{t('nav.browse')}</Link>
        <Link to="/help">{t('nav.help')}</Link>
        <LanguageSelector />
      </nav>
    </header>
  )
}

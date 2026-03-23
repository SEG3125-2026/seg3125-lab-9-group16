import { useTranslation } from 'react-i18next'

export default function LanguageSelector() {
  const { i18n } = useTranslation()

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="lang-select"
      aria-label="Select language"
    >
      <option value="en">English</option>
      <option value="fr">Français</option>
    </select>
  )
}

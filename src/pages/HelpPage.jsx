import { useTranslation } from 'react-i18next'

export default function HelpPage() {
  const { t } = useTranslation()
  return (
    <section className="page">
      <h2>{t('help.title')}</h2>
      <div className="help-content">
        <h3>{t('help.howToUse')}</h3>
        <p><strong>{t('help.browse')}</strong> {t('help.browseDesc')}</p>
        <p><strong>{t('help.listen')}</strong> {t('help.listenDesc')}</p>
        <p><strong>{t('help.comment')}</strong> {t('help.commentDesc')}</p>
        <p><strong>{t('help.zoom')}</strong> {t('help.zoomDesc')}</p>
        <h3>{t('help.needHelp')}</h3>
        <p>{t('help.contact')}</p>
      </div>
    </section>
  )
}

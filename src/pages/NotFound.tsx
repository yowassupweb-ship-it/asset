import { Link } from 'react-router'
import { PageHero } from '../components/Shared'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta('Страница не найдена')
  return (
    <PageHero eyebrow="404" title="Тут короткое замыкание" lead="Такой страницы нет — возможно, мы её переименовали или вы опечатались.">
      <Link to="/" className="btn btn--accent btn--lg">
        На главную
      </Link>
    </PageHero>
  )
}

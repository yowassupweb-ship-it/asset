import { IconBolt } from './Icon'

/**
 * Лого: молния + слово «Ассет».
 * Для финального логотипа из GPT: положите public/brand/logo-mark.svg
 * и замените <IconBolt /> на <img src="/brand/logo-mark.svg" alt="" />.
 */
export function Logo({ size = 'md' }: { size?: 'md' | 'lg' }) {
  return (
    <span className={`logo logo--${size}`}>
      <span className="logo__mark" aria-hidden>
        <IconBolt />
      </span>
      <span className="logo__word">Ассет</span>
    </span>
  )
}

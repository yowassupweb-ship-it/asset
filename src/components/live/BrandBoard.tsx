import { IconBolt } from '../Icon'
import { ScopedStyle } from './ScopedStyle'

/** Превью «карточка бренда». Код из окна задаёт переменные .board. */
export function BrandBoard({ code }: { code: string }) {
  return (
    <div className="pv-scope pv-frame" role="img" aria-label="Живая карточка бренда: цвета, шрифт и кнопка меняются вместе с кодом">
      <ScopedStyle code={code} />
      <div className="board">
        <div className="board__top">
          <div className="mark">
            <IconBolt />
          </div>
          <div>
            <p className="board__name">Ассет</p>
            <p className="board__sub">Брендбук · v1</p>
          </div>
        </div>
        <div className="board__palette">
          <i style={{ background: 'var(--brand)' }} />
          <i style={{ background: 'var(--accent)' }} />
          <i style={{ background: 'var(--ink)' }} />
          <i style={{ background: 'var(--paper)', boxShadow: 'inset 0 0 0 1px color-mix(in srgb, var(--ink) 20%, transparent)' }} />
        </div>
        <div className="board__type">
          <b>Aa</b>
          <span>Заголовок и текст бренда, который читается легко</span>
        </div>
        <div className="board__row">
          <button type="button" className="board__btn" tabIndex={-1}>
            Кнопка
          </button>
          <span className="board__tag">Тег</span>
        </div>
      </div>
    </div>
  )
}

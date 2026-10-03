import { IconBolt } from '../Icon'
import { ScopedStyle } from './ScopedStyle'

/** Превью «страница сайта». Код из окна меняет сетку, отступы и типографику. */
export function MiniSite({ code }: { code: string }) {
  return (
    <div className="pv-scope pv-frame" role="img" aria-label="Живой макет страницы: сетка и типографика меняются вместе с кодом">
      <ScopedStyle code={code} />
      <div className="site">
        <div className="site__nav">
          <span className="site__logo">
            <IconBolt />
          </span>
          <b />
          <b />
          <b />
        </div>
        <div className="intro">
          <div className="intro__text">
            <h4>Сайт, который продаёт</h4>
            <p>Быстро, красиво, понятно</p>
            <span className="site__btn">Заказать</span>
          </div>
          <div className="intro__art" />
        </div>
        <div className="cards">
          <div>
            <i />
            <b />
          </div>
          <div>
            <i />
            <b />
          </div>
          <div>
            <i />
            <b />
          </div>
        </div>
      </div>
    </div>
  )
}

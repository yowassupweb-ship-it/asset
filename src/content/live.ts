/**
 * Варианты кода для «живых» окон. Каждый вариант печатается по кругу
 * и сразу применяется к странице / превью.
 */

import { ensureContrast, mix, readableOn } from '../lib/color'

export interface Variant {
  id: string
  label: string
  code: string
  /** Цветная точка на вкладке */
  dot?: string
}

export type Mode = 'light' | 'dark'

/**
 * Темы в духе Apple: системные акценты (iOS/macOS) + нейтральные поверхности с лёгким оттенком.
 * У каждой темы есть светлая и тёмная версия.
 */
interface ThemeDef {
  id: string
  label: string
  accent: Record<Mode, string>
  /** Сила оттенка поверхностей (0 — чистые нейтральные) */
  tint: number
  /** Принудительная ссылка (для фирменной Volt) */
  link?: Record<Mode, string>
}

const themes: ThemeDef[] = [
  { id: 'volt', label: 'Volt', accent: { light: '#ffd60a', dark: '#ffd60a' }, tint: 0, link: { light: '#5446e6', dark: '#a89cff' } },
  { id: 'blue', label: 'Синий', accent: { light: '#007aff', dark: '#0a84ff' }, tint: 0.05 },
  { id: 'purple', label: 'Фиолет', accent: { light: '#af52de', dark: '#bf5af2' }, tint: 0.05 },
  { id: 'pink', label: 'Розовый', accent: { light: '#ff2d55', dark: '#ff375f' }, tint: 0.045 },
  { id: 'orange', label: 'Оранжевый', accent: { light: '#ff9500', dark: '#ff9f0a' }, tint: 0.05 },
  { id: 'green', label: 'Зелёный', accent: { light: '#34c759', dark: '#30d158' }, tint: 0.05 },
  { id: 'mint', label: 'Мятный', accent: { light: '#00c7be', dark: '#63e6e2' }, tint: 0.05 },
  { id: 'indigo', label: 'Индиго', accent: { light: '#5856d6', dark: '#5e5ce6' }, tint: 0.05 },
  { id: 'red', label: 'Красный', accent: { light: '#ff3b30', dark: '#ff453a' }, tint: 0.045 },
  { id: 'graphite', label: 'Графит', accent: { light: '#8e8e93', dark: '#aeaeb2' }, tint: 0, link: { light: '#0066cc', dark: '#2997ff' } },
]

const base: Record<Mode, { bg: string; elevated: string; sunken: string; text: string }> = {
  light: { bg: '#f5f5f7', elevated: '#ffffff', sunken: '#ececf0', text: '#0c0c0f' },
  dark: { bg: '#0c0c0f', elevated: '#17171c', sunken: '#08080a', text: '#f5f5f7' },
}

/** Текст кода темы для режима. Это и есть то, что печатается в консоли и применяется к сайту. */
export function buildThemeCode(id: string, mode: Mode): string {
  const t = themes.find((x) => x.id === id) ?? themes[0]!
  const b = base[mode]
  const accent = t.accent[mode]
  const bg = mix(b.bg, accent, t.tint)
  const elevated = mix(b.elevated, accent, t.tint * 0.6)
  const sunken = mix(b.sunken, accent, t.tint * (mode === 'light' ? 1.4 : 0.9))
  const link = t.link?.[mode] ?? ensureContrast(accent, bg)
  return `:root {
  color-scheme: ${mode};
  --bg: ${bg};
  --bg-elevated: ${elevated};
  --bg-sunken: ${sunken};
  --text: ${b.text};
  --accent: ${accent};
  --on-accent: ${readableOn(accent)};
  --link: ${link};
  --shape: 1;
}`
}

/** Варианты для консоли в выбранном режиме. */
export const themeVariantsFor = (mode: Mode): Variant[] =>
  themes.map((t) => ({ id: t.id, label: t.label, dot: t.accent[mode], code: buildThemeCode(t.id, mode) }))

export const themeIds = themes.map((t) => t.id)

/** Дизайн: карточка бренда. */
export const brandVariants: Variant[] = [
  {
    id: 'volt',
    label: 'Электрик',
    code: `.board {
  --paper: #fffdf3;
  --ink: #0c0c0f;
  --brand: #ffd60a;
  --on-brand: #0c0c0f;
  --accent: #6a5cff;
  --radius: 22px;
  --weight: 800;
  --font: Inter, sans-serif;
}
.mark { rotate: -8deg; }`,
  },
  {
    id: 'forest',
    label: 'Лес',
    code: `.board {
  --paper: #f1f4ec;
  --ink: #1e2a1f;
  --brand: #2f7d4f;
  --on-brand: #ffffff;
  --accent: #e9b44c;
  --radius: 10px;
  --weight: 600;
  --font: Georgia, serif;
}
.mark { rotate: 0deg; }`,
  },
  {
    id: 'neon',
    label: 'Неон',
    code: `.board {
  --paper: #0d0b1f;
  --ink: #f4f1ff;
  --brand: #ff3df2;
  --on-brand: #1a0020;
  --accent: #29f0ff;
  --radius: 30px;
  --weight: 900;
  --font: Inter, sans-serif;
}
.mark { rotate: 12deg; }`,
  },
  {
    id: 'mono',
    label: 'Моно',
    code: `.board {
  --paper: #ffffff;
  --ink: #000000;
  --brand: #000000;
  --on-brand: #ffffff;
  --accent: #ff4a1c;
  --radius: 0px;
  --weight: 700;
  --font: ui-monospace, monospace;
}
.mark { rotate: 0deg; }`,
  },
]

/** Сайты: макет страницы. */
export const siteVariants: Variant[] = [
  {
    id: 'split',
    label: 'Сплит',
    code: `.site {
  --gap: 14px;
  --radius: 14px;
}
.intro {
  grid-template-columns: 1.2fr 1fr;
  text-align: left;
}
.intro h4 { font-size: 26px; }
.cards { grid-template-columns: repeat(3, 1fr); }`,
  },
  {
    id: 'center',
    label: 'По центру',
    code: `.site {
  --gap: 18px;
  --radius: 28px;
}
.intro {
  grid-template-columns: 1fr;
  text-align: center;
}
.intro h4 { font-size: 32px; }
.cards { grid-template-columns: repeat(3, 1fr); }`,
  },
  {
    id: 'magazine',
    label: 'Журнал',
    code: `.site {
  --gap: 8px;
  --radius: 2px;
}
.intro {
  grid-template-columns: 1fr;
  text-align: left;
}
.intro h4 { font-size: 30px; }
.cards { grid-template-columns: 2fr 1fr 1fr; }`,
  },
  {
    id: 'dense',
    label: 'Плотный',
    code: `.site {
  --gap: 6px;
  --radius: 8px;
}
.intro {
  grid-template-columns: 1fr 1fr;
  text-align: left;
}
.intro h4 { font-size: 20px; }
.cards { grid-template-columns: repeat(3, 1fr); }`,
  },
]

/** Соцсети: контент-план. Формат строки: день | формат | тема */
export const planVariants: Variant[] = [
  {
    id: 'launch',
    label: 'Запуск',
    code: `# Неделя 1 · Знакомим с брендом
пн | Reels | Закулисье: как рождается продукт
вт | Пост | Кто мы и зачем это всё
ср | Сторис | Опрос: что вам важнее
чт | Карусель | 5 вопросов, которые нам задают
пт | Reels | Первый клиент рассказывает
вс | Пост | Итоги недели и анонс`,
  },
  {
    id: 'expert',
    label: 'Опыт',
    code: `# Неделя 2 · Показываем опыт
пн | Карусель | Разбор частой ошибки
ср | Пост | Кейс: что и как мы сделали
чт | Reels | 30 секунд про сложное
пт | Сторис | Вопрос-ответ с экспертом
сб | Пост | Чек-лист на выходные`,
  },
  {
    id: 'sales',
    label: 'Продажи',
    code: `# Неделя 3 · Рассказываем о товаре
пн | Пост | История клиента: до и после
вт | Reels | Распаковка заказа
ср | Сторис | Скидка на 24 часа
чт | Карусель | Что чем отличается
пт | Пост | Отзывы без фильтров
вс | Reels | Как выбрать правильно`,
  },
  {
    id: 'community',
    label: 'Комьюнити',
    code: `# Неделя 4 · Живое общение
пн | Сторис | Задайте вопрос — ответим
вт | Пост | Лучшие комментарии недели
чт | Reels | Подписчик за один день
пт | Карусель | Ваши фото и истории
сб | Сторис | Прямой эфир с командой`,
  },
]

/** Автоматизация: сценарий. «когда:» — триггер, «→» — шаги. */
export const flowVariants: Variant[] = [
  {
    id: 'leads',
    label: 'Заявки',
    code: `# Сценарий: новая заявка
когда: Форма на сайте
→ Клиенты: завести карточку
→ Telegram: уведомить менеджера
→ Почта: ответить клиенту
→ Таблица: записать источник`,
  },
  {
    id: 'reports',
    label: 'Отчёты',
    code: `# Сценарий: отчёт по понедельникам
когда: Пн, 09:00
→ Клиенты: выгрузить продажи
→ Статистика: собрать посещаемость
→ Таблица: посчитать итоги
→ Telegram: отправить руководителю`,
  },
  {
    id: 'support',
    label: 'Поддержка',
    code: `# Сценарий: вопрос клиента
когда: Сообщение в боте
→ ИИ: понять запрос
→ База знаний: найти ответ
→ Бот: ответить за 5 секунд
→ Менеджер: если нужен человек`,
  },
  {
    id: 'orders',
    label: 'Заказы',
    code: `# Сценарий: оплаченный заказ
когда: Оплата прошла
→ Склад: зарезервировать товар
→ Доставка: создать накладную
→ SMS: отправить трек-номер
→ 1С: закрыть документы`,
  },
]

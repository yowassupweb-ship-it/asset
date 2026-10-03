# Ассет — сайт студии

Vite + React 19 + TypeScript. Деплой — Vercel (`vercel.json` уже настроен).

```bash
npm install
npm run dev        # локальная разработка
npm run build      # проверка типов + продакшн-сборка в dist/
npm run lint
```

## Деплой на Vercel
1. Vercel → Add New Project → импортировать этот репозиторий.
2. Framework Preset определится как **Vite**, настройки менять не нужно.

## Структура
```
src/
  content/site.ts     ← ВСЕ тексты: услуги, FAQ, подход, контакты
  styles/tokens.css   ← дизайн-токены (ref → sys), светлая/тёмная тема
  styles/base.css     ← reset, типографика, утилиты (@layer)
  styles/components.css
  components/         ← секции сайта
  hooks/              ← тема, часы, появление при скролле
docs/ASSETS-BRIEF.md  ← ТЗ на логотип и иконки для GPT
```

## Дизайн-токены
Три уровня: **ref** (сырые значения: палитра Graphite / Volt / Plasma, шкала 4pt, флюидная типографика) →
**sys** (смысловые: `--bg`, `--text`, `--accent`, `--surface-glass`…, переопределяются в тёмной теме) →
компоненты используют только sys. Тема: системная + ручной переключатель (`data-theme`).

## Что заменить перед запуском
- Контакты в `src/content/site.ts` (`email`, `telegram`) — сейчас заглушки.
- Логотип и иконки — по `docs/ASSETS-BRIEF.md`.
- `public/og.png` — временная картинка для превью.
- Форма заявок открывает почтовый клиент (`mailto:`). Для приёма на сервере подключите Formspree
  или Vercel Function и замените `onSubmit` в `src/components/Contact.tsx`.

## Как добавить портфолио
В `src/components/Portfolio.tsx` заполните массив `cases` (`title`, `category`, `href`, `image`) —
заглушка автоматически заменится сеткой карточек.

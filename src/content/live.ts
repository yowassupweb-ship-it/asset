/**
 * Варианты кода для «живых» окон. Каждый вариант печатается по кругу
 * и сразу применяется к странице / превью.
 */

export interface Variant {
  id: string
  label: string
  code: string
}

/** Главная: токены настоящего сайта. Меняется вся страница. */
export const themeVariants: Variant[] = [
  {
    id: 'volt',
    label: 'Volt',
    code: `:root {
  color-scheme: light;
  --bg: #f5f5f7;
  --bg-elevated: #ffffff;
  --bg-sunken: #ececf0;
  --text: #0c0c0f;
  --accent: #ffd60a;
  --on-accent: #0c0c0f;
  --link: #5446e6;
  --shape: 1;
}`,
  },
  {
    id: 'midnight',
    label: 'Полночь',
    code: `:root {
  color-scheme: dark;
  --bg: #07070d;
  --bg-elevated: #14141f;
  --bg-sunken: #0b0b14;
  --text: #f2f2ff;
  --accent: #6a5cff;
  --on-accent: #ffffff;
  --link: #a89cff;
  --shape: 1.4;
}`,
  },
  {
    id: 'editorial',
    label: 'Редакция',
    code: `:root {
  color-scheme: light;
  --bg: #f4efe6;
  --bg-elevated: #fffaf0;
  --bg-sunken: #ebe3d4;
  --text: #1b1713;
  --accent: #d63a2c;
  --on-accent: #ffffff;
  --link: #b0301f;
  --shape: 0.25;
  --font-sans: Georgia, "Times New Roman", serif;
}`,
  },
  {
    id: 'aqua',
    label: 'Аква',
    code: `:root {
  color-scheme: light;
  --bg: #e9f7f5;
  --bg-elevated: #ffffff;
  --bg-sunken: #d4eeea;
  --text: #06232a;
  --accent: #14d9b5;
  --on-accent: #06232a;
  --link: #0a7d8c;
  --shape: 1.6;
}`,
  },
  {
    id: 'brutal',
    label: 'Брутал',
    code: `:root {
  color-scheme: light;
  --bg: #fffef0;
  --bg-elevated: #ffffff;
  --bg-sunken: #f0efdc;
  --text: #000000;
  --accent: #c6ff1a;
  --on-accent: #000000;
  --link: #0000ee;
  --shape: 0;
  --radius-pill: 0;
  --font-sans: ui-monospace, "SF Mono", monospace;
}`,
  },
]

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
.intro h4 { font-size: 40px; }
.cards { grid-template-columns: repeat(2, 1fr); }`,
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
    label: 'Экспертность',
    code: `# Неделя 2 · Показываем экспертизу
пн | Карусель | Разбор частой ошибки
ср | Пост | Кейс: что и как мы сделали
чт | Reels | 30 секунд про сложное
пт | Сторис | Вопрос-ответ с экспертом
сб | Пост | Чек-лист на выходные`,
  },
  {
    id: 'sales',
    label: 'Продажи',
    code: `# Неделя 3 · Мягкие продажи
пн | Пост | История клиента: до и после
вт | Reels | Распаковка заказа
ср | Сторис | Скидка на 24 часа
чт | Карусель | Сравнение вариантов
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
→ CRM: создать сделку
→ Telegram: уведомить менеджера
→ Почта: подтверждение клиенту
→ Таблица: записать источник`,
  },
  {
    id: 'reports',
    label: 'Отчёты',
    code: `# Сценарий: отчёт по понедельникам
когда: Пн, 09:00
→ CRM: выгрузить продажи
→ Метрика: собрать трафик
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

import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'

/** Главная грузится сразу, остальные страницы — отдельными чанками. */
export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    HydrateFallback: () => null,
    children: [
      { index: true, Component: Home },
      { path: 'services', lazy: async () => ({ Component: (await import('./pages/Services')).default }) },
      { path: 'services/:slug', lazy: async () => ({ Component: (await import('./pages/ServicePage')).default }) },
      { path: 'approach', lazy: async () => ({ Component: (await import('./pages/Approach')).default }) },
      { path: 'portfolio', lazy: async () => ({ Component: (await import('./pages/Portfolio')).default }) },
      { path: 'contact', lazy: async () => ({ Component: (await import('./pages/Contact')).default }) },
      { path: '*', lazy: async () => ({ Component: (await import('./pages/NotFound')).default }) },
    ],
  },
])

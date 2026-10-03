import { Approach } from './components/Approach'
import { Contact } from './components/Contact'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Menubar } from './components/Menubar'
import { Portfolio } from './components/Portfolio'
import { Services } from './components/Services'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()
  return (
    <>
      <a href="#main" className="skip-link">
        Перейти к содержимому
      </a>
      <Menubar />
      <main id="main">
        <Hero />
        <Services />
        <Approach />
        <Portfolio />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import AboutUs from '@/components/sections/AboutUs'
import Team from '@/components/sections/Team'
import Projects from '@/components/sections/Projects'
import Testimonials from '@/components/sections/Testimonials'
import Technologies from '@/components/sections/Technologies'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <AboutUs />
        <Team />
        <Projects />
        <Testimonials />
        <Technologies />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

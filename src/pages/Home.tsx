import Hero from '../components/sections/Hero'
import MarqueeStrip from '../components/sections/Marquee'
import About from '../components/sections/About'
import GalleryTeaser from '../components/sections/GalleryTeaser'
import RealityShows from '../components/sections/RealityShows'
import Services from '../components/sections/Services'
import BookingCTA from '../components/sections/BookingCTA'
import Footer from '../components/sections/Footer'

const Home = () => {
  return (
    <main>
      <Hero />
      <MarqueeStrip />
      <About />
      <GalleryTeaser />
      <RealityShows />
      <Services />
      <BookingCTA />
      <Footer />
    </main>
  )
}

export default Home
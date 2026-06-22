import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import FeaturedDishes from '../components/FeaturedDishes'
import Menu from '../components/Menu'
import About from '../components/About'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedDishes />
      <Menu />
      <About />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}

export default Home

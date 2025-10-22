import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Header from "./sections/Header"
import Hero from "./sections/Hero"
import Footer from "./sections/Footer"


gsap.registerPlugin(ScrollTrigger, SplitText)

function App() {
  return (
    <main>
      <Header/>
      <Hero/>
      <Footer/>
    </main>

  )
}

export default App






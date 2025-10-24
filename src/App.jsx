import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Header from "./sections/Header"
import Hero from "./sections/Hero"
import Persons from "./sections/Persons"
import Footer from "./sections/Footer"


gsap.registerPlugin(ScrollTrigger, SplitText)

function App() {
  return (
    <main>
      <Header/>
      <Hero/>
      <Persons/>
      <Footer/>
    </main>

  )
}

export default App






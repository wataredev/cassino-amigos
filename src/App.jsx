import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import { Outlet } from 'react-router'
import Header from "./sections/Header"
import Hero from "./components/Home/Hero"
import Persons from "./components/Home/Persons"
import Footer from "./sections/Footer"


gsap.registerPlugin(ScrollTrigger, SplitText)

function App() {
  return (
    <>
      <Header/>
      <main className=''>
        <Outlet/>
      </main>
      <Footer/>
    </>

  )
}

export default App






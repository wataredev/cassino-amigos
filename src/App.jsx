import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import { Outlet } from 'react-router'
import Header from "./sections/Header"
import Footer from "./sections/Footer"
import SmoothScroll from './components/SmoothScroll'
import { useAuthInit } from "../src/hooks/useAuthInit"

gsap.registerPlugin(ScrollTrigger, SplitText)

function App() {
  useAuthInit()
  return (
    <>
      <SmoothScroll />
      <Header/>
      <main className=''>
        <Outlet/>
      </main>
      <Footer/>
    </>

  )
}

export default App






import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import { Outlet } from 'react-router'
import Header from "./sections/Header"
import Landing from "./components/Landing/Hero"
import Persons from "./components/Landing/Persons"
import Footer from "./sections/Footer"
import { useSelector } from 'react-redux'
import { login, logout } from "./store/authSlice"
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import authService from './appwrite/auth'


gsap.registerPlugin(ScrollTrigger, SplitText)

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    authService
    .getCurrentUser()
    .then((userData) => {
      if (userData) dispatch(login({userData}));
      else dispatch(logout());
    })

  }, [dispatch])

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






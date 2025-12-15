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
import SmoothScroll from './components/SmoothScroll'
import authService from './appwrite/auth'
import service from './appwrite/config'
import conf from "./conf/conf"
import { Query } from "appwrite"


gsap.registerPlugin(ScrollTrigger, SplitText)

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then(async (userData) => {
      if (userData) {
        const res = await service.databases.listDocuments(
          conf.database,
          conf.tableUsuario,
          [Query.equal("accountId", userData.$id)]
        );

        const userDoc = res.documents[0];

        if (userDoc) {
          dispatch(login({ userData, userDoc }));
        } 
      }
    });
  }, [dispatch]);


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






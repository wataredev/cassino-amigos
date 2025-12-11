import React from 'react'
import { useSelector } from "react-redux";
import Perfil from '../components/ui/Perfil'

function Home() {

  const { userDoc } = useSelector((state) => state.auth)

  return (
    <div>
      <h1>Bem-vindo {userDoc?.nome_display} a</h1>
      <Perfil userDoc={userDoc}/>
    </div>
  )
}

export default Home
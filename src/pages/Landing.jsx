import React from 'react'
import Hero from '../components/Landing/Hero'
import Persons from '../components/Landing/Persons'
import Teste from '../components/Landing/Teste'
import Vices from '../components/Landing/Vices'
import Together from '../components/Landing/Together'
import Context from '../components/Landing/Context'

function Landing() {
  return (
    <>
        <Hero/>
        <Context/>
        <Vices/>
        <Persons/>
        <Together/>
        <Teste/>
    </>
  )
}

export default Landing
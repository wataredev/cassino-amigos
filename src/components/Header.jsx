import React from 'react'
import CardNav from './CardNav/CardNav'
import logo from '../assets/icone-cassino.svg'

function Header() {
  return (
    <CardNav
      logo={logo}
      logoAlt="Company Logo"
      baseColor="transparent"
      menuColor="#fff"
      buttonBgColor="transparent"
      buttonTextColor="#fff"
      ease="power3.out"
      className=""
    />
  )
}

export default Header
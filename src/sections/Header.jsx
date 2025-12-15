import React from 'react'
import { itemsHeader } from '../constants'
import CardNav from '../components/CardNav/CardNav'
import logo from '../assets/react.svg'


function Header() {
  return (
    <CardNav
      logo={logo}
      logoAlt="Company Logo"
      items={itemsHeader}
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
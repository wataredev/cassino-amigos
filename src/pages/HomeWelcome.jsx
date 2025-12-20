import React from 'react'
import GradientText from '../components/animations/GradientText/GradientText'
import { useSelector } from "react-redux";

function HomeWelcome() {

    const { userDoc } = useSelector((state) => state.auth)
  return (
    <div className='h-full w-full flex items-center justify-center flex-col'>

        <h2 className='text-1xl md:text-2xl lg:text-4xl leading-none'>Bem-vindo(a) {userDoc.nome_display} ao</h2>
        <GradientText
        colors={[
        "#6AE3B4",
        "#5B6EFF",
        "#6AE3B4",
        "#5B6EFF",
        "#6AE3B4"
        ]}
        animationSpeed={3}
        showBorder={false}
        className="text-9xl"
        >
        CASSINO
        </GradientText>

    </div>
  )
}

export default HomeWelcome
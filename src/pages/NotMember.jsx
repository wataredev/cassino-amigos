import React from 'react'
import notMember from "../assets/not-member.webp"

function NotMember() {
  return (
    <div className='flex justify-center items-center relative flex-col'>
        <img src={notMember} alt="Fotinha do Watare" />
        <h2 className='absolute bottom-10 text-4xl md:text-4xl lg:text-6xl font-light leading-none'>Pede pro Watarinho te Liberar</h2>
    </div>
  )
}

export default NotMember
import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useMediaQuery } from 'react-responsive'
import groupImage from '../../assets/images_together/foto-juntos.png'


function Together() {

    const isMobile = useMediaQuery({maxWidth: 767});
    const sectionArt = useRef()

    useGSAP((context) => {

        const start = isMobile ? 'top 20%' : 'top top'
        
        const maskTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: sectionArt.current,
                start: 'top top',
                end: 'bottom center',
                scrub: 1.5,
                pin: true,

            }
        })

        maskTimeline
        .to(context.selector('.title-fill'), {
            clipPath: 'inset(0 0% 0 0)',
            ease: 'none',
            duration: 1,
        }, 0)

        .to({}, { duration: 0.5 })

        .to(context.selector('.title-reveal'), {
            opacity: 0,
            ease: 'power1.inOut',
            duration: 0.5,
        })

        .to(context.selector('.masked-img'), {
            scale: 1.3,
            maskPosition: 'center',
            maskSize: '220%',
            duration: 1,
            ease: 'power1.inOut'
        })

        .to(context.selector('#masked-content'), {
            opacity: 1,
            duration: 1,
            ease: 'power1.inOut'
        })


    }, { scope: sectionArt, dependencies: [isMobile]})

  return (
    <div id='art' ref={sectionArt} className='container'>
        <div className=' mx-auto h-full pt-10'>
            <h2 className="title-reveal will-fade">
                <span className="title-base">Juntos</span>
                <span className="title-fill" aria-hidden="true">Juntos</span>
            </h2>

            <div className='content'>
                
                <div className='person-img'>
                    <img src={groupImage} alt="Foto do Grupo" className='abs-center masked-img size-full object-contain' />
                </div>

            </div>

            <div className='masked-container'>

                <div id='masked-content'>
                    <h3 className='font-light'>Aqui, ninguém joga sozinho.</h3>
                    <p className='text-(--color-subtext)'>Não é sobre sorte. É sobre quem permanece na mesa.</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Together
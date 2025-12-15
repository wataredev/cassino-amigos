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
                start,
                end: 'bottom center',
                scrub: 1.5,
                pin: true,

            }
        })

        maskTimeline
        .to(context.selector('.will-fade'), {
            opacity: 0, stagger: 0.2, ease: 'power1.inOut'
        })
        .to(context.selector('.masked-img'), {
            scale: 1.3, maskPosition: 'center', maskSize: '400%', duration: 1, ease: 'power1.inOut'
        })
        .to(context.selector('#masked-content'), {
            opacity: 1, duration: 1, ease: 'power1.inOut'
        })

    }, { scope: sectionArt, dependencies: [isMobile]})





  return (
    <div id='art' ref={sectionArt}>
        <div className='container mx-auto h-full pt-20'>
            <h2 className='will-fade'>Juntos</h2>

            <div className='content'>
                
                <div className='cocktail-img'>
                    <img src={groupImage} alt="cocktail" className='abs-center masked-img size-full object-contain' />
                </div>

            </div>

            <div className='masked-container'>

                <div id='masked-content'>
                    <h3>Aqui, ninguém joga sozinho.</h3>
                    <p>Não é sobre sorte. É sobre quem permanece na mesa.</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Together
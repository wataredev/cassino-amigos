import { useRef } from "react";
import LightRays from '../components/Backgrounds/LightRays/LightRays'
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";

function Hero() {


  const container = useRef();
  const videoContainer = useRef();
  const isMobile = useMediaQuery({maxWidth: 767})

  useGSAP((context) => {

  }, { scope: container})


  useGSAP((context) => {
    const videoRef = context.selector("#videoCartas")[0];
    if (!videoRef) return;

    const isMobile = window.innerWidth < 768;
    const startValue = isMobile ? "bottom bottom" : "bottom bottom";
    const endValue = isMobile ? "bottom top" : "bottom top";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: videoRef,
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    videoRef.onloadedmetadata = () => {
      tl.to(videoRef, {
        currentTime: videoRef.duration,
      });
    };
  }, { scope: videoContainer });



  return (

    <>
    
      <section ref={container} className="relative w-full h-screen flex justify-center items-center">

        

        <div className="z-50 text-5xl font-bold text-center">
          {/* <h2 className='text-transparent border-white' style={{WebkitTextStroke: "1px white"}}>CASSINO</h2> */}
        </div>
      </section>

      <div className="absolute inset-0 z-2">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

    <div ref={videoContainer} className="absolute inset-0">
      <video
        id="videoCartas"
        src="/videos/background-hero-video.mp4"
        muted
        playsInline
        preload="auto"
        loop
        className="w-full h-full object-cover -translate-y-full"
      />
    </div>
    
    
  </>


  );
}



export default Hero
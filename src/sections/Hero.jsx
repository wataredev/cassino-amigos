import { useRef } from "react";
import LightRays from '../components/Backgrounds/LightRays/LightRays'
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import SplitText from "../components/TextAnimations/SplitText/SplitText"
import gsap from "gsap";

function Hero() {


  const container = useRef();
  const videoContainer = useRef();
  const isMobile = useMediaQuery({maxWidth: 767})


  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

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
      
      <section ref={container} className="relative w-full h-screen flex overflow-hidden">

        <div ref={videoContainer} className="absolute inset-0 z-0">
          <video
            id="videoCartas"
            src="/videos/background-hero-video.mp4"
            muted
            playsInline
            preload="auto"
            loop
            className="w-full h-full object-cover"
          />
        </div>

        <div className="noisy"></div>

        <div className="absolute inset-0 z-20 pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>

        <div className="relative z-30 text-5xl text-center w-full pt-70">
          <SplitText
            text="CASSINO"
            className="neon-stroke text-9xl text-center text-transparent font-neon"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-10 bg-linear-to-b from-transparent via-black/80 to-black z-40 pointer-events-none"></div>

      </section>


    </>

  );
}



export default Hero
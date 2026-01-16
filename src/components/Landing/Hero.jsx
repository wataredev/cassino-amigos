import { useRef, useState } from "react";
import { Loader } from "../ui/loader";
import LightRays from "../animations/LightRays/LightRays";
import { useNavigate } from "react-router-dom"
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import SplitText from "../animations/SplitText/SplitText";
import { Button } from "../ui/button"
import gsap from "gsap";

function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const lightRaysRef = useRef(null);
  const timelineRef = useRef(null);
  const loaderRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const navigate = useNavigate()

  const [lightKey, setLightKey] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const loaderStartTime = useRef(Date.now());

  useGSAP(() => {

      if (isMobile) return;

      const hero = heroRef.current;
      const video = videoRef.current;
      if (!hero || !video) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom+=110% top",
          scrub: true,
          pin: true,
        }
      })

      timelineRef.current = tl;

      const addVideoAnimation = () => {
        if (video.duration && !isNaN(video.duration)) {
          tl.to(video, {
            currentTime: video.duration,
            ease: "none"
          });
          
          const MIN_LOADER_TIME = 2000;
          const elapsedTime = Date.now() - loaderStartTime.current;
          const remainingTime = Math.max(0, MIN_LOADER_TIME - elapsedTime);
          
          setTimeout(() => {
            gsap.to(loaderRef.current, {
              yPercent: -100,
              duration: 1.2,
              ease: "power3.inOut",
              onComplete: () => {
                setShowLoader(false);
              }
            });
          }, remainingTime);
        }
      };

      if (video.readyState >= 1 && video.duration) {
        addVideoAnimation();
      } else {
        video.onloadedmetadata = addVideoAnimation;
      }
    },
    { scope: heroRef }
  );

  return (
    <>
      {showLoader && !isMobile && (
        <div 
          ref={loaderRef}
          className="fixed inset-0 z-[9999] bg-black"
        >
          <Loader 
            show={true} 
            text="Bem-Vindo ao Clube"
            variant="casino"
          />
        </div>
      )}

      <div ref={heroRef} className="hero-wrapper relative w-full h-screen">

        <div className="h-screen w-full pointer-events-none" />

        <video
          ref={videoRef}
          id="videoCartas"
          src="https://res.cloudinary.com/dffzhlzzx/video/upload/background-hero-video_fdtupb.mp4"
          muted
          playsInline
          preload="auto"
          autoPlay={isMobile}
          className="absolute inset-0 w-full h-full object-cover -z-10 pointer-events-none"
        />

        <div className="noisy absolute inset-0 z-30 pointer-events-none"></div>

        <div className="absolute inset-0 z-40 pointer-events-none">
          <LightRays
            key={lightKey}
            onInit={(instance) => (lightRaysRef.current = instance)}
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={isMobile ? 0.7 : 1.2}
            lightSpread={0.8}
            rayLength={2}
            followMouse={!isMobile}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
          />
        </div>

        <section className="absolute top-0 left-0 w-full h-screen flex items-center justify-center z-60">

          <div className="flex flex-col items-center justify-center text-center w-full">
            <h3 className="text-gray-400 tracking-widest text-sm md:text-base mb-2 uppercase">
              Clube dos Viciados em Boa Companhia
            </h3>

            <SplitText
              text="CASSINO"
              className="neon-stroke text-6xl md:text-9xl text-center font-light tracking-[0.25em]"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />

            <Button variant="club" size="club" className={"mt-8"} onClick={() => navigate("/login")}>
              Entrar no Clube
            </Button>

          </div>
        </section>

        <div className="absolute -bottom-7 left-0 w-full h-10 bg-gradient-to-b from-transparent via-black/80 to-black z-50 pointer-events-none"></div>
      </div>
    </>
  );
}

export default Hero;
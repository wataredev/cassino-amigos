import { useRef, useLayoutEffect, useState } from "react";
import LightRays from "../animations/LightRays/LightRays";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import SplitText from "../animations/SplitText/SplitText";
import { Button, buttonVariants} from "../ui/button"
import gsap from "gsap";

function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const lightRaysRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [showLight, setShowLight] = useState(false);
  const [lightKey, setLightKey] = useState(0);

  /**
   * Cleanup ao desmontar (saindo da rota)
   */
  // useLayoutEffect(() => {
  //   return () => {
  //     ScrollTrigger.getAll().forEach((t) => t.kill());
  //     if (videoRef.current) gsap.killTweensOf(videoRef.current);
  //     if (lightRaysRef.current?.destroy) lightRaysRef.current.destroy();
  //   };
  // }, []);

  /**
   * Garante que o LightRays será renderizado só depois do layout
   */
  // useLayoutEffect(() => {
  //   requestAnimationFrame(() => {
  //     requestAnimationFrame(() => {
  //       setLightKey((prev) => prev + 1);
  //       setShowLight(true);
  //     });
  //   });
  // }, []);

  useGSAP(
    () => {
      const hero = heroRef.current;
      const video = videoRef.current;
      if (!hero || !video) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: isMobile ? "bottom+=90% top" : "bottom+=110% top",
          scrub: true,
          pin: true,
        }
      })

      video.onloadedmetadata = () => {
        tl.to(video, {
            currentTime: video.duration,
        })
      }
    },
    { scope: heroRef }
  );

  return (
    <div ref={heroRef} className="hero-wrapper relative w-full h-screen">

      <div className="h-screen w-full pointer-events-none" />

      <video
        ref={videoRef}
        id="videoCartas"
        src="/videos/background-hero-video.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover -z-10 pointer-events-none"
      />

      <div className="noisy absolute inset-0 z-30 pointer-events-none"></div>

      <div className="absolute inset-0 z-40 pointer-events-none">
        <LightRays
          key={lightKey}
          onInit={(instance) => (lightRaysRef.current = instance)}
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={2}
          followMouse={true}
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
            className="neon-stroke text-6xl md:text-9xl text-transparent text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
          />

          <Button variant="club" size="club" className={"mt-8"}>
            Entrar no Clube
          </Button>

        </div>
      </section>

      <div className="absolute -bottom-2 left-0 w-full h-10 bg-gradient-to-b from-transparent via-black/80 to-black z-50 pointer-events-none"></div>
    </div>
  );
}

export default Hero;

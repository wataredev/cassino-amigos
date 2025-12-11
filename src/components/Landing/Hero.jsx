import { useRef, useLayoutEffect, useState } from "react";
import LightRays from "./LightRays/LightRays";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import SplitText from "../TextAnimations/SplitText/SplitText";
import { imagesMemorieHero } from "../../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const lightRaysRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [showLight, setShowLight] = useState(false);
  const [lightKey, setLightKey] = useState(0);

  const handleAnimationComplete = () => console.log("All letters animated!");

  /**
   * Cleanup ao desmontar (saindo da rota)
   */
  useLayoutEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (videoRef.current) gsap.killTweensOf(videoRef.current);
      if (lightRaysRef.current?.destroy) lightRaysRef.current.destroy();
    };
  }, []);

  /**
   * Garante que o LightRays será renderizado só depois do layout
   */
  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLightKey((prev) => prev + 1);
        setShowLight(true);
      });
    });
  }, []);

  useGSAP(
    () => {
      const hero = heroRef.current;
      const video = videoRef.current;
      if (!hero || !video) return;

      const createTrigger = () => {
        video.currentTime = 0;
        return ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: isMobile ? "bottom+=90% top" : "bottom+=110% top",
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            if (video.duration > 0) {
              video.currentTime = self.progress * video.duration;
            }
          },
        });
      };

      if (video.readyState >= 1) return createTrigger();
      const handler = () => createTrigger();
      video.addEventListener("loadedmetadata", handler, { once: true });
      return () => video.removeEventListener("loadedmetadata", handler);
    },
    { scope: heroRef, dependencies: [isMobile] }
  );

  /**
   * ScrollTrigger — animação das imagens sumindo
   */
  useGSAP(
    () => {
      const container = imagesContainerRef.current;
      if (!container) return;

      const imgs = container.querySelectorAll("img");
      if (!imgs.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      imgs.forEach((img, index) => {
        tl.to(
          img,
          {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: "power2.out",
          },
          index * 0.3
        );
      });
    },
    { scope: heroRef }
  );

  return (
    <div ref={heroRef} className="hero-wrapperrelative w-full h-[125vh] overflow-hidden">

      {/* RESERVA PARA PIN */}
      <div className="h-[125vh] w-full pointer-events-none" />

      {/* VÍDEO */}
      <video
        ref={videoRef}
        id="videoCartas"
        src="/videos/background-hero-video.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover -z-10 pointer-events-none"
      />

      {/* NOISE */}
      <div className="noisy absolute inset-0 z-[30] pointer-events-none"></div>

      {/* LIGHTRAYS — agora 100% estável */}
      <div className="absolute inset-0 z-[40] pointer-events-none">
        {showLight && (
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
        )}
      </div>

      {/* CAMADA PRINCIPAL */}
      <section className="absolute top-0 left-0 w-full h-screen flex items-center justify-center z-[60]">

        {/* IMAGENS MEMORIES */}
        <div
          ref={imagesContainerRef}
          className="absolute inset-0 overflow-hidden pointer-events-none z-[20]"
        >
          {imagesMemorieHero.map(({ label, src, className }) => (
            <img
              key={label}
              src={src}
              alt={label}
              className={`${className} absolute grayscale`}
            />
          ))}
        </div>

        {/* TEXTOS */}
        <div className="flex flex-col items-center justify-center text-center w-full">
          <h3 className="text-gray-400 tracking-widest text-sm md:text-base mb-2 uppercase">
            Clube dos Viciados em Boa Companhia
          </h3>

          <SplitText
            text="CASSINO"
            className="neon-stroke text-6xl md:text-9xl text-transparent text-center font-neon"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            onLetterAnimationComplete={handleAnimationComplete}
          />

          <button className="mt-8 px-10 py-3 border border-gray-400/40 text-gray-300 hover:text-white hover:border-white transition-all rounded-full backdrop-blur-sm">
            Entrar no Clube
          </button>
        </div>
      </section>

      {/* FADE INFERIOR */}
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-b from-transparent via-black/80 to-black z-[50] pointer-events-none"></div>
    </div>
  );
}

export default Hero;

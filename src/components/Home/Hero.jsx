import { useRef, useState, useEffect } from "react";
import LightRays from "./LightRays/LightRays";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import SplitText from "../TextAnimations/SplitText/SplitText";
import { imagesMemorieHero } from "../../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  // animações gerais do container (mantido)
  useGSAP(() => {}, { scope: heroRef });

  // animação de vídeo com scroll
  useGSAP(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    if (!hero || !video) return;

    const createST = () => {
      video.currentTime = 0;

      return ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: isMobile ? "bottom+=90% top" : "bottom+=110% top",
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (video.duration > 0) {
            video.currentTime = self.progress * video.duration;
          }
        },
      });
    };

    let st;
    if (video.readyState >= 1) {
      st = createST();
    } else {
      const onMeta = () => (st = createST());
      video.addEventListener("loadedmetadata", onMeta, { once: true });
      return () => video.removeEventListener("loadedmetadata", onMeta);
    }

    return () => st && st.kill();
  }, [isMobile]);

  return (
    <div ref={heroRef} className="relative w-full h-[125vh]">

      {/* RESERVA DE LAYOUT (evita colapso que bugava o LightRays) */}
      <div className="h-[125vh] w-full pointer-events-none" />

      {/* VÍDEO FIXO NO FUNDO */}
      <video
        ref={videoRef}
        id="videoCartas"
        src="/videos/background-hero-video.mp4"
        muted
        playsInline
        preload="auto"
        className="fixed top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none"
      />

      {/* NOISE */}
      <div className="noisy fixed inset-0 z-[30] pointer-events-none"></div>

      {/* LIGHTRAYS — acima do noisy */}
      <div className="fixed inset-0 z-[40] pointer-events-none">
        <LightRays
          key={typeof window !== "undefined" ? window.innerWidth + window.innerHeight : 0}
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

      {/* CONTEÚDO DO HERO — acima de tudo */}
      <section className="absolute top-0 left-0 w-full h-screen flex items-center justify-center z-[60]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[20]">
          {imagesMemorieHero.map(({ label, src, className }) => (
            <img
              key={label}
              src={src}
              alt={label}
              className={`${className} absolute grayscale`}
            />
          ))}
        </div>

        <div className="flex flex-col items-center justify-center text-center w-full">
          <h3 className="text-gray-400 tracking-widest text-sm md:text-base mb-2 uppercase">
            Clube dos Viciados em Boa Companhia
          </h3>
          <SplitText
            text="CASSINO"
            className="neon-stroke text-6xl md:text-9xl text-center text-transparent font-neon"
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

          <button className="mt-8 px-10 py-3 border border-gray-400/40 text-gray-300 hover:text-white hover:border-white transition-all rounded-full backdrop-blur-sm">
            Entrar no Clube
          </button>
        </div>
      </section>

      {/* Fade bottom preto */}
      <div className="fixed bottom-0 left-0 w-full h-10 bg-linear-to-b from-transparent via-black/80 to-black z-[50] pointer-events-none"></div>
    </div>
  );
}

export default Hero;

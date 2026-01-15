import { useRef, useEffect } from "react";
import { 
  ClipLoader, 
  RingLoader, 
  PulseLoader,
  ScaleLoader 
} from "react-spinners";
import gsap from "gsap";

export function Loader({ 
  show = true, 
  text = "Carregando...",
  type = "ring",
  onComplete 
}) {
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!show && loaderRef.current) {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => onComplete?.()
      });
    }
  }, [show, onComplete]);

  if (!show && loaderRef.current?.style.opacity === "0") return null;

  const loaders = {
    ring: <RingLoader color="#ffffff" size={80} />,
    clip: <ClipLoader color="#ffffff" size={80} />,
    pulse: <PulseLoader color="#ffffff" size={15} />,
    scale: <ScaleLoader color="#ffffff" height={50} />
  };

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
    >
      {loaders[type]}
      {text && (
        <p className="font-light tracking-[0.25em] text-white/90 mt-2 text-2xl">
          {text}
        </p>
      )}
    </div>
  );
}
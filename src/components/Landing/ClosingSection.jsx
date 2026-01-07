import React from "react";
import Balatro from "../animations/Balatro/Balatro";

function ClosingSection() {
  return (
    <section className="relative overflow-hidden bg-black h-[50vh] md:h-[60vh]">

      <div className="absolute inset-0 balatro-fade">
        <Balatro
          isRotate={false}
          mouseInteraction={true}
          pixelFilter={2400}
          color1="#020202"
          color2="#3a3a3a"
          color3="#5a5a5a"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 vignette-strong" />
      
      <div className="relative z-10 flex h-full items-center justify-center flex-col gap-6 md:gap-8">
        <h1 className="text-4xl md:text-6xl font-light tracking-[0.25em] text-white/90">SEGUIMOS</h1>
        <p className="w-[80%] md:w-full text-center text-sm md:text-base leading-relaxed text-white/60">Nada aqui é definitivo. As ideias mudam, as histórias crescem e o espaço continua se transformando com quem faz parte.</p>
      </div>

    </section>
  );
}

export default ClosingSection;

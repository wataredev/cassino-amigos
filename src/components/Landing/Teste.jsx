import React from "react";
import Balatro from "../Balatro/Balatro";

function Teste() {
  return (
    <section className="relative overflow-hidden bg-black h-[70vh] md:h-[80vh] mt-24 md:mt-32">
      
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
      
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="text-white text-5xl font-light">
          Let’s Get in <span className="font-semibold">Touch</span>
        </h1>
      </div>

    </section>
  );
}

export default Teste;

import React from "react";
import { imagesVices } from "../../constants";

function Vices() {
  return (
    <section className="relative w-full py-32 container border-bottom-default">
      <h2 className="text-6xl md:text-7xl font-bold leading-none">
        Vícios do Cassino
      </h2>

      <p className="mt-3 text-(--color-subtext) text-2xl pl-2">
        Não são defeitos. São características de fábrica.
      </p>

      <div className="top-grid mt-4">
        <div className="md:col-span-3">
          <div className="noisy" />
          <img src={imagesVices[0].src} alt={imagesVices[0].label} />
        </div>

        <div className="md:col-span-6">
          <div className="noisy" />
          <img src={imagesVices[1].src} alt={imagesVices[1].label} />
        </div>

        <div className="md:col-span-3">
          <div className="noisy" />
          <img src={imagesVices[2].src} alt={imagesVices[2].label} />
        </div>
      </div>

      <div className="bottom-grid">
        <div className="md:col-span-8">
          <div className="noisy" />
          <img src={imagesVices[3].src} alt={imagesVices[3].label} />
        </div>

        <div className="md:col-span-4">
          <div className="noisy" />
          <img src={imagesVices[4].src} alt={imagesVices[4].label} />
        </div>
      </div>
    </section>
  );
}

export default Vices;

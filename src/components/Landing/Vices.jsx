import { useRef } from "react";
import { imagesVices } from "../../constants";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

function Vices() {

  const vicesSection = useRef()

  useGSAP(
    (context) => {
      const h2 = context.selector("h2");
      const p = context.selector("p")

      const titleSplit = new SplitText(h2, {
        type: "words",
      });

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: h2,
          start: "top 80%",
        },
      });

      scrollTimeline.from(titleSplit.words, {
        opacity: 0,
        yPercent: 100,
        duration: 1,
        ease: "expo.out",
        stagger: 0.02,
      });

      scrollTimeline.from(
        p,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );

      const gridItems = [
        ...context.selector(".top-grid > div"),
        ...context.selector(".bottom-grid > div"),
      ];

      scrollTimeline.from(
        gridItems,
        {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power1.out",
          stagger: 0.05,
        },
        "-=0.5"
      );
    },
    { scope: vicesSection }
  );

  return (
    <section ref={vicesSection} className="relative w-full py-15 md:py-32 container border-bottom-default items-center md:items-start text-center md:text-start">
      
      <h2 className="text-4xl md:text-4xl lg:text-6xl font-light leading-none">
        Vícios do Cassino
      </h2>

      <p className="mt-3 text-(--color-subtext) text-base sm:text-2xl md:pl-2">
        Não são defeitos. São características de fábrica.
      </p>

      <div className="top-grid mt-5">
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

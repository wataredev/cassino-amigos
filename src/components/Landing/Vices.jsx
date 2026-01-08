import { useRef, useMemo } from "react";
import { imagesVices } from "../../constants";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

function Vices() {
  const vicesSection = useRef(null);

  useGSAP(
    (context) => {
      const h2 = context.selector("h2");
      const p = context.selector("p");
      const topGridItems = context.selector(".top-grid > div");
      const bottomGridItems = context.selector(".bottom-grid > div");

      const titleSplit = new SplitText(h2, {
        type: "words",
      });

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: h2,
          start: "top 80%",
          once: true,
        },
      });

      scrollTimeline
        .from(titleSplit.words, {
          opacity: 0,
          yPercent: 100,
          duration: 1,
          ease: "expo.out",
          stagger: 0.02,
        })
        .from(
          p,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          [...topGridItems, ...bottomGridItems],
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

  const imageElements = useMemo(
    () => ({
      top: imagesVices.slice(0, 3),
      bottom: imagesVices.slice(3, 5),
    }),
    []
  );

  return (
    <section
      ref={vicesSection}
      className="relative w-full py-15 md:py-32 container border-bottom-default items-center md:items-start text-center md:text-start"
    >
      <h2 className="text-4xl md:text-4xl lg:text-6xl font-light leading-none">
        Vícios do Cassino
      </h2>

      <p className="mt-3 text-(--color-subtext) text-base sm:text-2xl md:pl-2">
        Não são defeitos. São características de fábrica.
      </p>

      <div className="top-grid mt-5">
        {imageElements.top.map((image, index) => (
          <div
            key={`top-${index}`}
            className={index === 1 ? "md:col-span-6" : "md:col-span-3"}
          >
            <div className="noisy" />
            <img
              src={image.src}
              alt={image.label}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      <div className="bottom-grid">
        {imageElements.bottom.map((image, index) => (
          <div
            key={`bottom-${index}`}
            className={index === 0 ? "md:col-span-8" : "md:col-span-4"}
          >
            <div className="noisy" />
            <img
              src={image.src}
              alt={image.label}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Vices;

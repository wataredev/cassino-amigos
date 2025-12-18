import { useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

function Context() {

  const contextSection = useRef()

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
    },
    { scope: contextSection }
  );

  return (
    <section ref={contextSection} className='container border-bottom-default py-30 flex justify-center flex-col items-center md:items-start text-center md:text-start'>

        <h2 className="text-4xl md:text-4xl lg:text-6xl font-light leading-none">O que é isso aqui?</h2>

        <p className="mt-6 text-(--color-subtext)  text-base sm:text-2xl">
            Isso aqui é só um espaço nosso. Um lugar pra juntar histórias,
            ideias aleatórias, projetos que surgem do nada e coisas que
            provavelmente não fariam sentido fora desse contexto.
        </p>

    </section>
  )
}

export default Context
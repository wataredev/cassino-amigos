import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";


function Persons() {

  const faqSection = useRef()

  useGSAP((context) => {
    const h2 = context.selector("h2");
    const introP = context.selector("p")[0];
    const button = context.selector("button");
    const faqItems = context.selector(".faq-item");

    const titleSplit = new SplitText(h2, {
      type: "lines",
      linesClass: "line-hidden",
    });

    const introTl = gsap.timeline({
      scrollTrigger: {
        trigger: h2,
        start: "top 75%",
      },
    });

    introTl
    .from(titleSplit.lines, {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      stagger: 0.12,
    })
    .from(
      introP,
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    )
    .from(
      button,
      {
        opacity: 0,
        y: 15,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    );

    gsap.from(faqItems, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.25,
      scrollTrigger: {
        trigger: faqItems[0],
        start: "top 80%",
      },
    });
  },{ scope: faqSection });

  return (
    <section ref={faqSection} className="relative w-full py-32 grid grid-cols-1 md:grid-cols-2 gap-20 container border-bottom-default">

      <div className="md:sticky md:top-32 h-fit">
        <h2 className="text-6xl md:text-7xl font-light leading-none">
          Perguntas <br /> frequentes
        </h2>

        <p className="mt-6 text-(--color-subtext) max-w-sm">
          As dúvidas que todo mundo tem, mas finge que não.  
          Aqui a gente responde sem enrolação (ou quase).
        </p>

        <button className="mt-8 px-6 py-3 border border-black rounded-full">
          Falar com a gente
        </button>
      </div>

      <div className="space-y-32 md:space-y-32 space-y-16">
        <div className="faq-item">
          <h3 className="text-2xl">Como funciona?</h3>
          <p className="mt-2 text-(--color-subtext)">
            Funciona na base da amizade, do caos organizado e de boas ideias
            que surgem do nada. Cada um contribui do seu jeito. seja criando,
            zoando ou só aparecendo.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="text-2xl">Quem são os membros?</h3>
          <p className="mt-2 text-(--color-subtext)">
            Um grupo de amigos com personalidades bem diferentes, mas com algo
            em comum: ninguém aqui leva a vida tão a sério (exceto quando precisa).
          </p>
        </div>

        <div className="faq-item">
          <h3 className="text-2xl">De onde veio o nome?</h3>
          <p className="mt-2 text-(--color-subtext)">
            O nome surgiu em uma conversa aleatória, como quase tudo por aqui.
            Pode não fazer sentido à primeira vista, mas depois de um tempo
            passa a fazer todo.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="text-2xl">O que tem no site?</h3>
          <p className="mt-2 text-(--color-subtext)">
            Histórias, ideias, projetos, lembranças e aquele conteúdo que só
            faz sentido pra quem faz parte. Basicamente: nosso cantinho na
            internet.
          </p>
        </div>
      </div>


    </section>
  );
}

export default Persons;
